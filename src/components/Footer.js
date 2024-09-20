// src/components/Footer.js
import { pushToDataLayer } from '../utils/analytics.js';

export function Footer() {
	const currentYear = new Date().getFullYear();

	return `
        <div class="container py-3">
            <div class="row">
                <div class="col-md-8 offset-md-2 border-top pt-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <small>&copy; ${currentYear} - All rights reserved.</small>
                        <small><a href="/sitemap" class="text-muted footer-nav-link" data-nav-item="sitemap">Sitemap</a></small>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function setupFooterEventListeners() {
	const footerLinks = document.querySelectorAll('.footer-nav-link');
	footerLinks.forEach((link) => {
		link.addEventListener('click', (e) => {
			const navItem = e.currentTarget.getAttribute('data-nav-item');
			pushToDataLayer('nav_item_clicked', {
				nav_item: navItem,
				link_url: e.currentTarget.href,
				nav_position: 'footer',
			});
		});
	});
}

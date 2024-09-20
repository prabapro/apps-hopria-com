// src/components/Footer.js

export function Footer() {
	const currentYear = new Date().getFullYear();

	return `
      <footer class="container py-3 mt-4">
        <div class="row">
          <div class="col-md-8 offset-md-2 border-top pt-4">
            <div class="d-flex justify-content-between align-items-center">
              <small>&copy; ${currentYear} - All rights reserved.</small>
              <small><a href="/sitemap" class="text-muted">Sitemap</a></small>
            </div>
          </div>
        </div>
      </footer>
    `;
}

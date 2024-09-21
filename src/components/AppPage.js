// /src/components/AppPage.js
import { pushToDataLayer } from '../utils/analytics.js';
import { handleRoute } from '../main.js';

export const AppPage = (app) => `
  <div class="container py-3">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="app-page-content">
          <h1 class="mb-4">${app.name}</h1>
          <img src="${app.logo}" class="img-fluid mb-4 rounded" alt="${app.name} logo">
          <div class="mb-4 mt-4 app-page-content-body">
            ${app.content}
          </div>
          <div class="app-page-footer-links text-center text-lg-start">
            <span>
              <a href="${app.downloadLink}" class="btn btn-primary" target="_blank" data-app-slug="${app.slug}" data-app-name="${app.name}">Download</a>
            </span>
            <span>
              <a href="/${app.slug}/privacy-policy" class="privacy-policy-link mx-4" rel="noopener noreferrer" data-app-slug="${app.slug}" data-app-name="${app.name}">Privacy Policy</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

export const setupAppPageEventListeners = () => {
	const downloadBtn = document.querySelector('.btn-primary');
	const privacyPolicyLink = document.querySelector('.privacy-policy-link');

	if (downloadBtn) {
		downloadBtn.addEventListener('click', (e) => {
			const appSlug = e.currentTarget.getAttribute('data-app-slug');
			const appName = e.currentTarget.getAttribute('data-app-name');
			pushToDataLayer('download_button_clicked', {
				app_name: appName,
				app_slug: appSlug,
				link_url: e.currentTarget.href,
			});
		});
	}

	if (privacyPolicyLink) {
		privacyPolicyLink.addEventListener('click', (e) => {
			e.preventDefault();
			const appSlug = e.currentTarget.getAttribute('data-app-slug');
			const appName = e.currentTarget.getAttribute('data-app-name');
			pushToDataLayer('privacy_policy_clicked', {
				app_name: appName,
				app_slug: appSlug,
				link_url: e.currentTarget.href,
			});
			window.history.pushState({}, '', `/${appSlug}/privacy-policy`);
			handleRoute();
		});
	}
};

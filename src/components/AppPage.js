import { pushToDataLayer } from '../utils/analytics.js';

export function AppPage(app) {
	return `
    <div class="container py-3">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="app-page-content">
            <h1 class="mb-4">${app.name}</h1>
            <img src="${app.logo}" class="img-fluid mb-4 rounded" alt="${app.name} logo">
            <div class="mb-4 mt-4 app-page-content-body">
              ${app.content}
            </div>
            <div class="app-page-footer-links text-center">
				<div>
				 <a href="${app.downloadLink}" class="btn btn-primary" target="_blank">Download</a>
				</div>
				<div class="mt-4">
				 <a href="/${app.slug}/privacy-policy" class="privacy-policy-link" rel="noopener noreferrer">Privacy Policy</a>
				</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function setupAppPageEventListeners(appDetails) {
	const downloadBtn = document.querySelector('.btn-primary');
	const privacyPolicyLink = document.querySelector('.privacy-policy-link');

	if (downloadBtn) {
		downloadBtn.addEventListener('click', () => {
			pushToDataLayer('download_button_clicked', {
				app_name: appDetails.name,
				app_slug: appDetails.slug,
				link_url: downloadBtn.href,
			});
		});
	}

	if (privacyPolicyLink) {
		privacyPolicyLink.addEventListener('click', (e) => {
			e.preventDefault();
			pushToDataLayer('privacy_policy_clicked', {
				app_name: appDetails.name,
				app_slug: appDetails.slug,
				link_url: privacyPolicyLink.href,
			});
			window.history.pushState({}, '', `/${appDetails.slug}/privacy-policy`);
			handleRoute();
		});
	}
}

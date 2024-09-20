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
            <div class="app-page-footer-links">
              <a href="${app.downloadLink}" class="btn btn-primary me-2 download-btn" target="_blank">Download</a>
              <a href="/${app.slug}/privacy-policy" class="btn btn-link-custom privacy-policy-btn" rel="noopener noreferrer">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function setupAppPageEventListeners(appDetails) {
	const downloadBtn = document.querySelector('.download-btn');
	const privacyPolicyBtn = document.querySelector('.privacy-policy-btn');

	if (downloadBtn) {
		downloadBtn.addEventListener('click', () => {
			pushToDataLayer('app_download_clicked', {
				app_name: appDetails.name,
				app_slug: appDetails.slug,
			});
		});
	}

	if (privacyPolicyBtn) {
		privacyPolicyBtn.addEventListener('click', () => {
			pushToDataLayer('privacy_policy_viewed', {
				app_name: appDetails.name,
				app_slug: appDetails.slug,
			});
		});
	}
}

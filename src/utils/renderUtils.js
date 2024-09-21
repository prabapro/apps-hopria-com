// src/utils/renderUtils.js
import { AppCard } from '../components/AppCard.js';
import { AppPage, setupAppPageEventListeners } from '../components/AppPage.js';
import { pushToDataLayer } from './analytics.js';

export const renderHome = (apps, setDocumentTitle, trackPageView) => {
	const main = document.querySelector('main');
	main.innerHTML = `
    <div class="container py-5">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="row row-cols-1 row-cols-md-2 g-4" id="app-grid"></div>
        </div>
      </div>
    </div>
  `;
	const appGrid = document.getElementById('app-grid');
	apps.forEach((app) => {
		if (app && app.slug) {
			const cardWrapper = document.createElement('div');
			cardWrapper.className = 'col';
			const card = AppCard(app);
			cardWrapper.appendChild(card);
			appGrid.appendChild(cardWrapper);
		}
	});
	const pageTitle = setDocumentTitle('Home');
	trackPageView('/', pageTitle);
};

export const renderAppPage = (
	slug,
	loadAppDetails,
	setDocumentTitle,
	trackPageView
) => {
	const appDetails = loadAppDetails(slug);
	if (!appDetails) {
		console.error(`App details not found for slug: ${slug}`);
		return;
	}
	const main = document.querySelector('main');
	main.innerHTML = AppPage(appDetails);
	setupAppPageEventListeners(appDetails);
	const pageTitle = setDocumentTitle(appDetails.name);
	trackPageView(`/${slug}`, pageTitle);
};

export const renderPrivacyPolicy = (
	slug,
	loadAppDetails,
	loadPrivacyPolicy,
	setDocumentTitle,
	trackPageView,
	handleRoute
) => {
	const appDetails = loadAppDetails(slug);
	if (!appDetails) {
		console.error(`App details not found for slug: ${slug}`);
		return;
	}
	const privacyPolicy = loadPrivacyPolicy(slug);
	const main = document.querySelector('main');
	main.innerHTML = `
    <div class="container py-2 px-3">
      <div class="row">
        <div id="content-column" class="col-md-8 offset-md-2">
          <div id="privacy-policy-container" class="privacy-policy-container">
            <div id="privacy-policy-header" class="privacy-policy-header">
              <h1>Privacy Policy for ${appDetails.name}</h1>
              <p class="privacy-policy-last-updated">Last updated: <code>${privacyPolicy.updated}</code></p>
            </div>
            <div id="privacy-policy-content" class="privacy-policy-content">${privacyPolicy.content}</div>
            <div class="text-start">
              <a id="back-to-app-btn" href="/${slug}" class="btn btn-primary back-to-app-btn">Back to App</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

	const backToAppBtn = document.querySelector('.back-to-app-btn');
	if (backToAppBtn) {
		backToAppBtn.addEventListener('click', (e) => {
			e.preventDefault();
			pushToDataLayer('back_to_app_clicked', {
				app_name: appDetails.name,
				app_slug: appDetails.slug,
				link_url: backToAppBtn.href,
			});
			window.history.pushState({}, '', `/${slug}`);
			handleRoute();
		});
	}
	const pageTitle = setDocumentTitle(`${appDetails.name} Privacy Policy`);
	trackPageView(`/${slug}/privacy-policy`, pageTitle);
};

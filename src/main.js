import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { AppCard } from './components/AppCard.js';
import { AppPage, setupAppPageEventListeners } from './components/AppPage.js';
import { Header } from './components/Header.js';
import {
	loadAppContent,
	loadAppDetails,
	loadPrivacyPolicy,
} from './utils/contentLoader.js';
import { pushToDataLayer } from './utils/analytics.js';

let apps = loadAppContent();

function renderHome() {
	const main = document.querySelector('main');
	main.innerHTML = `
	  <div class="container py-5">
		<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" id="app-grid"></div>
	  </div>
	`;
	const appGrid = document.getElementById('app-grid');
	apps.forEach((app) => {
		if (app && app.slug) {
			// Only create a card if the app data is valid
			const cardWrapper = document.createElement('div');
			cardWrapper.className = 'col';
			const card = AppCard(app);
			cardWrapper.appendChild(card);
			appGrid.appendChild(cardWrapper);
		}
	});
}

function renderAppPage(slug) {
	const appDetails = loadAppDetails(slug);
	if (!appDetails) {
		console.error(`App details not found for slug: ${slug}`);
		// Consider rendering an error page or redirecting to home
		return;
	}
	const main = document.querySelector('main');
	main.innerHTML = AppPage(appDetails);
	setupAppPageEventListeners(appDetails);
}

function renderPrivacyPolicy(slug) {
	const appDetails = loadAppDetails(slug);
	if (!appDetails) {
		console.error(`App details not found for slug: ${slug}`);
		// Consider rendering an error page or redirecting to home
		return;
	}
	const policyContent = loadPrivacyPolicy(slug);
	const main = document.querySelector('main');
	main.innerHTML = `
	  <div class="container py-5">
		<div class="row">
		  <div class="col-md-8 offset-md-2">
			<div class="privacy-page-content">
			  <div>
				${policyContent}
			  </div>
			  <a href="/${slug}" class="btn btn-primary mt-4 back-to-app-btn">Back to App</a>
			</div>
		  </div>
		</div>
	  </div>
	`;

	// Set up event listener for the "Back to App" button
	const backToAppBtn = document.querySelector('.back-to-app-btn');
	if (backToAppBtn) {
		backToAppBtn.addEventListener('click', (e) => {
			e.preventDefault();
			pushToDataLayer('back_to_app_clicked', {
				app_name: appDetails.name,
				app_slug: appDetails.slug,
				from_page: `/${appDetails.slug}/privacy_policy`,
			});
			window.history.pushState({}, '', `/${slug}`);
			handleRoute();
		});
	}
}

export function handleRoute() {
	const path = window.location.pathname;
	const [, slug, page] = path.split('/');

	if (!slug) {
		renderHome();
	} else if (page === 'privacy-policy') {
		renderPrivacyPolicy(slug);
	} else {
		renderAppPage(slug);
	}
}

function initApp() {
	const app = document.getElementById('app');
	if (!app) return;

	app.innerHTML = `
    <header id="header"></header>
    <main id="main"></main>
  `;

	const header = document.querySelector('header');
	if (header) header.innerHTML = Header();

	handleRoute();
}

// Initial load
document.addEventListener('DOMContentLoaded', initApp);

// Navigation handling
window.addEventListener('popstate', handleRoute);

// Make handleRoute available globally
window.handleRoute = handleRoute;

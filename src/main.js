import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { AppCard } from './components/AppCard.js';
import { AppPage } from './components/AppPage.js';
import { Header } from './components/Header.js';
import {
	loadAppContent,
	loadAppDetails,
	loadPrivacyPolicy,
} from './utils/contentLoader.js';

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
	const main = document.querySelector('main');
	main.innerHTML = AppPage(appDetails);
}

function renderPrivacyPolicy(slug) {
	const policyContent = loadPrivacyPolicy(slug);
	const main = document.querySelector('main');
	main.innerHTML = `
    <div class="container py-5">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="app-page-content">
            <h1 class="mb-4">Privacy Policy</h1>
            <div class="mb-4">
              ${policyContent}
            </div>
            <a href="/${slug}" class="btn btn-primary">Back to App</a>
          </div>
        </div>
      </div>
    </div>
  `;
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

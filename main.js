import 'bootstrap/dist/css/bootstrap.min.css';
import './src/css/style.css';
import { AppCard } from './src/components/AppCard.js';
import { AppPage } from './src/components/AppPage.js';
import { Header } from './src/components/Header.js';
import {
	loadAppContent,
	loadAppDetails,
	loadPrivacyPolicy,
} from './src/utils/contentLoader.js';

const apps = loadAppContent();

function renderHome() {
	const main = document.querySelector('main');
	main.innerHTML = `
	  <div class="container py-5">
		<h1 class="mb-4 text-center">Discover Amazing Apps</h1>
		<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" id="app-grid"></div>
	  </div>
	`;
	const appGrid = document.getElementById('app-grid');
	apps.forEach((app) => {
		const cardWrapper = document.createElement('div');
		cardWrapper.className = 'col';
		const card = AppCard(app);
		cardWrapper.appendChild(card);
		appGrid.appendChild(cardWrapper);
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

document.addEventListener('DOMContentLoaded', () => {
	const header = document.querySelector('header');
	header.innerHTML = Header();
	handleRoute();
});

window.addEventListener('popstate', handleRoute);

// Make handleRoute available globally
window.handleRoute = handleRoute;

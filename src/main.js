import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip } from 'bootstrap';
import './style.css';
import { AppCard } from './components/AppCard.js';
import { AppPage, setupAppPageEventListeners } from './components/AppPage.js';
import { Header, setupHeaderEventListeners } from './components/Header.js';
import {
	loadAppContent,
	loadAppDetails,
	loadPrivacyPolicy,
} from './utils/contentLoader.js';
import {
	pushToDataLayer,
	loadGoogleTagManager,
	isLocalhost,
} from './utils/analytics.js';

let apps = loadAppContent();

// Initialize dataLayer with traffic_type
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
	event: 'initialize_config',
	traffic_type: isLocalhost() ? 'developer' : 'production',
});

function setDocumentTitle(title) {
	document.title = `${title} | Praba's Apps`;
	return document.title;
}

function trackPageView(pagePath, pageTitle) {
	pushToDataLayer('virtual_page_view', {
		page_path: pagePath,
		page_title: pageTitle,
	});
}

function initTooltips() {
	const tooltipTriggerList = [].slice.call(
		document.querySelectorAll('[data-bs-toggle="tooltip"]')
	);
	tooltipTriggerList.forEach((tooltipTriggerEl) => {
		new Tooltip(tooltipTriggerEl);
	});
}

function renderHome() {
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
}

function renderAppPage(slug) {
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
}

function renderPrivacyPolicy(slug) {
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
					<a id="back-to-app-btn" href="/${slug}" class="btn btn-primary back-to-app-btn">Back to App</a>
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
				from_page: `/${slug}/privacy-policy`,
			});
			window.history.pushState({}, '', `/${slug}`);
			handleRoute();
		});
	}
	const pageTitle = setDocumentTitle(`${appDetails.name} Privacy Policy`);
	trackPageView(`/${slug}/privacy-policy`, pageTitle);
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
	if (header) {
		header.innerHTML = Header();
		initTooltips(); // Initialize tooltips after rendering the header
		setupHeaderEventListeners(); // Setup event listeners for header nav items
	}

	// Load GTM once at init
	loadGoogleTagManager();

	handleRoute();
}

// Initial load
document.addEventListener('DOMContentLoaded', initApp);

// Navigation handling
window.addEventListener('popstate', handleRoute);

// Make handleRoute available globally
window.handleRoute = handleRoute;

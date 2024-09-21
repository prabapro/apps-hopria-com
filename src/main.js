// src/main.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';
import { Header, setupHeaderEventListeners } from './components/Header.js';
import { Footer, setupFooterEventListeners } from './components/Footer.js';
import { setDocumentTitle, initTooltips } from './utils/domUtils.js';
import {
	loadAppContent,
	loadAppDetails,
	loadPrivacyPolicy,
	handleScroll,
} from './utils/contentLoader.js';
import {
	loadGoogleTagManager,
	isLocalhost,
	trackPageView,
} from './utils/analytics.js';

import {
	renderHome,
	renderAppPage,
	renderPrivacyPolicy,
} from './utils/renderUtils.js';

const apps = loadAppContent();

// Initialize dataLayer with traffic_type
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
	event: 'initialize_config',
	traffic_type: isLocalhost() ? 'developer' : 'production',
});

export const handleRoute = () => {
	const path = window.location.pathname;
	const [, slug, page] = path.split('/');

	if (!slug) {
		renderHome(apps, setDocumentTitle, trackPageView);
	} else if (page === 'privacy-policy') {
		renderPrivacyPolicy(
			slug,
			loadAppDetails,
			loadPrivacyPolicy,
			setDocumentTitle,
			trackPageView,
			handleRoute
		);
	} else {
		renderAppPage(slug, loadAppDetails, setDocumentTitle, trackPageView);
	}

	// Reset scroll position after rendering the new page
	window.scrollTo(0, 0);
};

const initApp = () => {
	const app = document.getElementById('app');
	if (!app) return;

	app.innerHTML = `
    <header id="header"></header>
    <main id="main"></main>
    <footer id="footer"></footer>
  `;

	const header = document.querySelector('header');
	if (header) {
		header.innerHTML = Header();
		initTooltips();
		setupHeaderEventListeners();
	}

	const footer = document.querySelector('footer');
	if (footer) {
		footer.innerHTML = Footer();
		setupFooterEventListeners();
	}

	// Load GTM once at init
	loadGoogleTagManager();

	handleRoute();
	handleScroll(); // Call once to set initial state
	window.addEventListener('scroll', handleScroll);
};

// Initial load
document.addEventListener('DOMContentLoaded', initApp);

// Navigation handling
window.addEventListener('popstate', handleRoute);

// Make handleRoute available globally
window.handleRoute = handleRoute;

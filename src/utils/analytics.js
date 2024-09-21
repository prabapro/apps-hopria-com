// /src/utils/analytics.js
export const isLocalhost = () =>
	window.location.hostname === 'localhost' ||
	window.location.hostname === '127.0.0.1';

export const pushToDataLayer = (eventName, eventData) => {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({
		event: eventName,
		...eventData,
	});
};

export const trackPageView = (pagePath, pageTitle) => {
	pushToDataLayer('virtual_page_view', {
		page_path: pagePath,
		page_title: pageTitle,
	});
};

// Google Tag Manager
export const loadGoogleTagManager = () => {
	((w, d, s, l, i) => {
		w[l] = w[l] || [];
		w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
		const f = d.getElementsByTagName(s)[0];
		const j = d.createElement(s);
		const dl = l !== 'dataLayer' ? '&l=' + l : '';
		j.async = true;
		j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
		f.parentNode.insertBefore(j, f);
	})(window, document, 'script', 'dataLayer', 'GTM-PR8SPQS8');
};

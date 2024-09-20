// analytics.js
export function isLocalhost() {
	return (
		window.location.hostname === 'localhost' ||
		window.location.hostname === '127.0.0.1'
	);
}

// export function pushToDataLayer(eventName, eventData) {
// 	window.dataLayer = window.dataLayer || [];
// 	const dataToSend = { ...eventData };
// 	if (isLocalhost()) {
// 		dataToSend.traffic_type = 'developer';
// 	}
// 	window.dataLayer.push({
// 		event: eventName,
// 		...dataToSend,
// 	});
// }

export function pushToDataLayer(eventName, eventData) {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({
		event: eventName,
		...eventData,
	});
}

// Google Tag Manager
export function loadGoogleTagManager() {
	(function (w, d, s, l, i) {
		w[l] = w[l] || [];
		w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
		var f = d.getElementsByTagName(s)[0],
			j = d.createElement(s),
			dl = l != 'dataLayer' ? '&l=' + l : '';
		j.async = true;
		j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
		f.parentNode.insertBefore(j, f);
	})(window, document, 'script', 'dataLayer', 'GTM-PR8SPQS8');
}

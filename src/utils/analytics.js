// analytics.js

export function pushToDataLayer(eventName, eventData) {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({
		event: eventName,
		...eventData,
	});
}

// You can add more analytics-related functions here as needed

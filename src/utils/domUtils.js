// src/utils/domUtils.js
import { Tooltip } from 'bootstrap';

export const setDocumentTitle = (title) => {
	document.title = `${title} | Hoptira Apps`;
	return document.title;
};

export const initTooltips = () => {
	const tooltipTriggerList = [].slice.call(
		document.querySelectorAll('[data-bs-toggle="tooltip"]')
	);
	tooltipTriggerList.forEach((tooltipTriggerEl) => {
		new Tooltip(tooltipTriggerEl);
	});
};

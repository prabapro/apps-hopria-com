import appData from 'virtual:app-data';

export const loadAppContent = () => appData.filter((app) => app && app.slug);

export const loadAppDetails = (slug) =>
	appData.find((app) => app && app.slug === slug);

export const loadPrivacyPolicy = (slug) => {
	const app = appData.find((app) => app && app.slug === slug);
	return app ? app.privacyPolicy : '<p>Privacy policy not found.</p>';
};

export const handleScroll = () => {
	const header = document.querySelector('.sticky-top');
	const navbar = document.querySelector('.nav-border');
	if (header && navbar) {
		if (window.scrollY > 0) {
			header.classList.add('scrolled');
			navbar.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
			navbar.classList.remove('scrolled');
		}
	}
};

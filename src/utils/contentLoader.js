import appData from 'virtual:app-data';

export function loadAppContent() {
  return appData;
}

export function loadAppDetails(slug) {
  return appData.find(app => app.slug === slug);
}

export function loadPrivacyPolicy(slug) {
  const app = appData.find(app => app.slug === slug);
  return app ? app.privacyPolicy : '<p>Privacy policy not found.</p>';
}
import appData from 'virtual:app-data';

export function loadAppContent() {
  return appData.filter(app => app && app.slug);  // Filter out any invalid entries
}

export function loadAppDetails(slug) {
  return appData.find(app => app && app.slug === slug);
}

export function loadPrivacyPolicy(slug) {
  const app = appData.find(app => app && app.slug === slug);
  return app ? app.privacyPolicy : '<p>Privacy policy not found.</p>';
}
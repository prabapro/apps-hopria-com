export function AppPage(app) {
	return `
    <div class="container py-5">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="app-page-content">
            <h1 class="mb-4">${app.name}</h1>
            <img src="${app.logo}" class="img-fluid mb-4 rounded" alt="${app.name} logo">
            <div class="mb-4">
              <span class="badge bg-primary">${app.type}</span>
            </div>
            <div class="mb-4">
              ${app.content}
            </div>
            <div>
              <a href="${app.downloadLink}" class="btn btn-primary me-2">Download</a>
              <a href="/${app.slug}/privacy-policy" class="btn btn-secondary">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

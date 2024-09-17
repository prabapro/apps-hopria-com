import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export default function appDataPlugin() {
	const virtualModuleId = 'virtual:app-data';
	const resolvedVirtualModuleId = '\0' + virtualModuleId;

	return {
		name: 'app-data',
		resolveId(id) {
			if (id === virtualModuleId) {
				return resolvedVirtualModuleId;
			}
		},
		load(id) {
			if (id === resolvedVirtualModuleId) {
				const appsDir = path.resolve('content/apps');
				const policiesDir = path.resolve('content/privacy-policies');
				const files = fs.readdirSync(appsDir);

				const appData = files
					.filter((file) => file.endsWith('.md'))
					.map((file) => {
						const slug = file.replace('.md', '');
						const appFilePath = path.join(appsDir, file);
						const policyFilePath = path.join(policiesDir, file);

						const appSource = fs.readFileSync(appFilePath, 'utf-8');
						const { data: appData, content: appContent } = matter(appSource);

						let policyContent = '';
						let policyTitle = '';
						let policyUpdated = '';
						if (fs.existsSync(policyFilePath)) {
							const policySource = fs.readFileSync(policyFilePath, 'utf-8');
							const { data: policyData, content: policyMarkdown } =
								matter(policySource);
							policyContent = marked(policyMarkdown);
							policyTitle = policyData.title || '';
							policyUpdated = policyData.updated || '';
						}

						return {
							slug,
							...appData,
							content: marked(appContent),
							privacyPolicy: {
								content: policyContent,
								title: policyTitle,
								updated: policyUpdated,
							},
						};
					});

				return `export default ${JSON.stringify(appData)}`;
			}
		},
	};
}

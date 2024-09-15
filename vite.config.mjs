import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import matter from 'gray-matter';
import { marked } from 'marked';

const __dirname = dirname(fileURLToPath(import.meta.url));

function generateAppData() {
	const appsDir = resolve(__dirname, 'content/apps');
	const policiesDir = resolve(__dirname, 'content/privacy-policies');
	const files = fs.readdirSync(appsDir);

	const appData = files.map((file) => {
		const slug = file.replace('.md', '');
		const appFilePath = resolve(appsDir, file);
		const policyFilePath = resolve(policiesDir, file);

		const appSource = fs.readFileSync(appFilePath, 'utf-8');
		const { data, content } = matter(appSource);

		let policyContent = '';
		if (fs.existsSync(policyFilePath)) {
			const policySource = fs.readFileSync(policyFilePath, 'utf-8');
			policyContent = marked(matter(policySource).content);
		}

		return {
			slug,
			...data,
			content: marked(content),
			privacyPolicy: policyContent,
		};
	});

	return appData;
}

export default defineConfig({
	plugins: [
		{
			name: 'markdown-loader',
			resolveId(source) {
				if (source === 'virtual:app-data') {
					return source;
				}
			},
			load(id) {
				if (id === 'virtual:app-data') {
					return `export default ${JSON.stringify(generateAppData())}`;
				}
			},
		},
	],
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
			},
		},
	},
});

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const appTemplate = `---
name: APP_NAME
description: 
type: APP_TYPE
logo: /images/APP_SLUG.jpg
downloadLink: 
---

[![Chrome Web Store Logo](/images/available-in-chrome.png)](https://chromewebstore.google.com/detail/slt-broadband-usage-check/cdmfcngnfgnhddcheambbdjdjmelnoep)

`;

const privacyPolicyTemplate = `---
title: APP_NAME
updated: CURRENT_DATE
---

## Introduction

This Privacy Policy describes how the APP_NAME APP_TYPE ("I", "we", "our", or "the APP_TYPE") collects, uses, and shares information about you when you use our APP_TYPE. We are committed to protecting your privacy and ensuring you have a positive experience using our APP_TYPE.

## Information We Collect

### 1. Usage Data

We collect anonymous usage data using Google Analytics 4 (GA4) to help us understand how users interact with our extension and to improve our service. This data includes:

- xxx

### 2. Technical Information

We collect certain technical information about your browser and device, including:

- Browser type and version
- Operating system
- xxx

## How We Use Your Information

We use the collected information for the following purposes:

1. To provide and maintain the core functionality of the APP_TYPE
2. To improve and optimize the APP_TYPE's performance and user experience
3. To analyze usage patterns and trends
4. To detect and prevent technical issues

## Data Storage and Security

- Google Analytics data is stored on Google's servers according to their data retention policies.

## Third-Party Services

We use Google Analytics 4 (GA4) to collect anonymous usage data. Google may use this data in accordance with its Privacy Policy: https://policies.google.com/privacy

## Changes to this Privacy Policy

We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.

## Contact Us

If you have any questions about this Privacy Policy, please write us at: <code>support@apps.prabapro.me</code>
`;

function createMarkdownFile(dir, filename, content) {
	const filePath = path.join(dir, filename);
	fs.writeFileSync(filePath, content);
	console.log(`Created ${filePath}`);
}

function slugify(str) {
	return str
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)+/g, '');
}

function getCurrentDate() {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.toLocaleString('default', { month: 'long' });
	const day = date.getDate();
	return `${year}, ${month} ${day}`;
}

function promptAppType() {
	return new Promise((resolve) => {
		rl.question(
			'Select the app type:\n1. Browser Extension\n2. Web App\n3. CMS\n4. Others\nEnter the number: ',
			(answer) => {
				switch (answer) {
					case '1':
						resolve('Browser Extension');
						break;
					case '2':
						resolve('Web App');
						break;
					case '3':
						resolve('CMS');
						break;
					case '4':
						rl.question('Enter the custom app type: ', (customType) => {
							resolve(customType);
						});
						break;
					default:
						console.log('Invalid option. Defaulting to Browser Extension.');
						resolve('Browser Extension');
				}
			}
		);
	});
}

async function main() {
	const appName = await new Promise((resolve) => {
		rl.question('Enter the name of the new app: ', resolve);
	});

	const appType = await promptAppType();

	const appSlug = slugify(appName);
	const currentDate = getCurrentDate();

	const appContent = appTemplate
		.replace(/APP_NAME/g, appName)
		.replace(/APP_SLUG/g, appSlug)
		.replace(/APP_TYPE/g, appType);

	const privacyPolicyContent = privacyPolicyTemplate
		.replace(/APP_NAME/g, appName)
		.replace(/CURRENT_DATE/g, currentDate)
		.replace(/APP_TYPE/g, appType);

	createMarkdownFile(
		path.join(__dirname, 'content', 'apps'),
		`${appSlug}.md`,
		appContent
	);
	createMarkdownFile(
		path.join(__dirname, 'content', 'privacy-policies'),
		`${appSlug}.md`,
		privacyPolicyContent
	);

	console.log(
		`\nNew app "${appName}" (${appType}) has been created with the slug "${appSlug}".`
	);
	console.log(`Remember to add an app logo image at /images/${appSlug}.jpg`);

	rl.close();
}

main();

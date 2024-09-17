# Praba's Apps

This project is a Vite-based vanilla JavaScript application designed to showcase a collection of apps. It features dynamically generated pages for each app and its corresponding privacy policy, all created from Markdown files.

## Features

- Vite-powered for fast development and optimized production builds
- Vanilla JavaScript with a component-based architecture
- Dynamic routing without a framework
- Markdown-based content management for apps and privacy policies
- Custom Vite plugin for processing Markdown files
- Responsive design using Bootstrap
- Google Tag Manager integration for analytics
- Automated app page creation script

## Prerequisites

- Node.js (version 14 or later recommended)
- npm (comes with Node.js)

## Setup

1. Clone the repository:

   ```
   git clone git@github.com:prabapro/apps-prabapro-me.git
   cd apps-prabapro-me
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:8080`

## Project Structure

- `src/`: Contains the main application code
  - `components/`: Reusable UI components
  - `utils/`: Utility functions
  - `index.html`: Main HTML file
  - `main.js`: Application entry point
  - `style.css`: Global styles
- `content/`: Markdown files for app descriptions and privacy policies
  - `apps/`: App description files
  - `privacy-policies/`: Privacy policy files
- `public/`: Static assets
- `vite.config.js`: Vite configuration
- `vite-plugin-app-data.js`: Custom plugin for processing Markdown files
- `create-app.js`: Script for creating new app pages

## Adding a New App

1. Run the create-app script:

   ```
   npm run create-app
   ```

2. Enter the name of your new app when prompted.

3. The script will create two new files:

   - `content/apps/<app-slug>.md`: App description
   - `content/privacy-policies/<app-slug>.md`: Privacy policy

4. Edit these files to add your app's details and privacy policy.

5. Add an app logo image at `public/images/<app-slug>.jpg`.

## Building for Production

To create a production build:

```
npm run build
```

The built files will be in the `dist/` directory.

## Preview Production Build

To preview the production build:

```
npm run preview
```

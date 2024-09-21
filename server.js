// server.js

import { spawn } from 'child_process';

let viteProcess = null;

const startVite = () => {
	if (viteProcess) {
		viteProcess.kill();
	}

	viteProcess = spawn('npx', ['vite', '--host'], { stdio: 'inherit' });

	viteProcess.on('close', (code) => {
		if (code !== null) {
			console.log(`Vite process exited with code ${code}`);
		}
	});
};

startVite();

process.on('SIGINT', () => {
	if (viteProcess) {
		viteProcess.kill();
	}
	process.exit();
});

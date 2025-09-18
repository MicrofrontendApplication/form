// copy-assets.js
import fs from 'fs';
import path from 'path';

const source = path.resolve('node_modules/microfrontend/public/Icons/sprite.svg');
const destDir = path.resolve('public/Icons');
const dest = path.join(destDir, 'sprite.svg');

// Ensure destination directory exists
fs.mkdirSync(destDir, { recursive: true });

// Copy the file
fs.copyFileSync(source, dest);

console.log(`✔ sprite.svg copied to public/Icons`);

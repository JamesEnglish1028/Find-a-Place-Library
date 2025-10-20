const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'vite.svg');
const dest = path.join(__dirname, 'dist', 'vite.svg');

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  console.log('vite.svg copied to dist folder.');
} else {
  console.log('vite.svg not found in project root.');
}

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

fs.mkdirSync(dist, { recursive: true });

const copy = (from, to, label) => {
  const src = path.join(root, from);
  if (!fs.existsSync(src)) {
    console.warn(`⚠ ${from} not found, skipping`);
    return;
  }
  fs.cpSync(src, path.join(dist, to), { recursive: true });
  console.log(`✓ ${label} → dist/${to}`);
};

copy('src/styles.css', 'styles.css', 'styles.css');
copy('src/font', 'font', 'Fonts (woff2)');
copy('src/img', 'img', 'SVG assets');
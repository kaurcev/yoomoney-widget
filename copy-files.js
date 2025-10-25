const fs = require('fs-extra');

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

if (fs.existsSync('src/img')) {
  fs.copySync('src/img', 'dist/img');
  console.log('✓ SVG files copied to dist/img');
} else {
  console.log('⚠ src/img folder not found');
}

if (fs.existsSync('src/font')) {
  fs.copySync('src/font', 'dist/font');
  console.log('✓ Font files copied to dist/font');
} else {
  console.log('⚠ src/font folder not found');
}
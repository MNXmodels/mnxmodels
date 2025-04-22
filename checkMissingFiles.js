const fs = require('fs');
const path = require('path');

// Load the config file
const config = require('./scripts/config.js');
console.log('Config loaded:', config); // Debug log to check the loaded config

if (!config.paths) {
    console.error('❌ The "paths" property is missing in config.js');
    process.exit(1); // Exit the script with an error code
}

// List of required files based on config.js
const requiredFiles = [
    config.heroBackground,
    config.logo,
    config.paths.styles,
    config.paths.config,
    config.paths.domPurify,
    config.paths.mainScript,
    config.social.instagram.icon,
    config.social.tiktok.icon,
    config.social.x.icon,
    config.social.telegram.icon,
    './sections/hero.html',
    './sections/about.html',
    './sections/services.html',
    './sections/join.html',
    './sections/footer.html',
    './index.html'
];

// Debugging: Log each path before checking
requiredFiles.forEach((file, index) => {
    if (!file) {
        console.error(`❌ Invalid path at index ${index}: ${file}`);
    } else {
        console.log(`Checking file: ${file}`);
    }
});

// Check if each file exists
requiredFiles.forEach((file) => {
    if (!file) {
        console.error(`❌ Invalid path: ${file}`);
        return;
    }
    const fullPath = path.join('.', file);
    if (!fs.existsSync(fullPath)) {
        console.error(`❌ Missing file: ${fullPath}`);
    } else {
        console.log(`✅ File exists: ${fullPath}`);
    }
});
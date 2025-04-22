const fs = require('fs');

const requiredFiles = [
    './assets/icons/instagram.svg',
    './assets/icons/tiktok.svg',
    './assets/icons/x.svg',
    './assets/icons/telegram.svg',
    './assets/images/hero1.jpg',
    './assets/images/logo.png',
    './scripts/config.js',
    './scripts/main.js',
    './node_modules/dompurify/dist/purify.min.js',
    './styles/style.css',
    './sections/hero.html',
    './sections/about.html',
    './sections/services.html',
    './sections/join.html',
    './sections/footer.html',
    './index.html'
];

requiredFiles.forEach((file) => {
    if (!fs.existsSync(file)) {
        console.error(`❌ Missing file: ${file}`);
    } else {
        console.log(`✅ File exists: ${file}`);
    }
});
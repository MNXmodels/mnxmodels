document.addEventListener('DOMContentLoaded', async () => {
    const contentDiv = document.getElementById('content');
    if (!contentDiv) {
        console.error('Content div not found');
        return;
    }

    console.log('Config object:', config); // Check if config is defined
    console.log('DOMPurify:', DOMPurify); // Check if DOMPurify is defined
    console.log('Social Config:', config.social);

    const sections = ['hero', 'about', 'services', 'join', 'footer'];

    for (const section of sections) {
        try {
            const response = await fetch('./sections/' + section + '.html');
            if (!response.ok) throw new Error('Failed to load ' + section + '.html');
            let data = await response.text();

            console.log('Before replacement:', data);
            // Replace placeholders with config values
            data = data.replace('{{companyName}}', config.companyName)
                      .replace('{{website}}', config.website)
                      .replace('{{logo}}', config.logo)
                      .replace('{{email}}', config.email)
                      .replace('{{social.instagram}}', config.social.instagram)
                      .replace('{{social.tiktok}}', config.social.tiktok)
                      .replace('{{social.x}}', config.social.x)
                      .replace('{{social.instagram.url}}', config.social.instagram.url)
                      .replace('{{social.instagram.icon}}', config.social.instagram.icon)
                      .replace('{{social.tiktok.url}}', config.social.tiktok.url)
                      .replace('{{social.tiktok.icon}}', config.social.tiktok.icon)
                      .replace('{{social.x.url}}', config.social.x.url)
                      .replace('{{social.x.icon}}', config.social.x.icon)
                      .replace('{{social.telegram.url}}', config.social.telegram.url)
                      .replace('{{social.telegram.icon}}', config.social.telegram.icon);
            console.log('After replacement:', data);

            console.log('After replacement, before sanitization:', data);
            const sanitizedData = DOMPurify.sanitize(data);
            console.log('After sanitization:', sanitizedData);

            const div = document.createElement('div');
            div.innerHTML = sanitizedData;
            contentDiv.appendChild(div);
        } catch (error) {
            console.error('Error loading section:', section, error);
        }
    }

    // Section-specific JavaScript
    try {
        // Hero: Logo hover effect
        const logo = document.querySelector('.hero-content .logo');
        if (logo) {
            logo.addEventListener('mouseover', () => {
                logo.style.transform = 'scale(1.1) rotate(5deg)';
            });
            logo.addEventListener('mouseout', () => {
                logo.style.transform = 'scale(1)';
            });
        }

        // Join: Form validation
        const form = document.querySelector('#join-form');
        if (form) {
            form.addEventListener('submit', (event) => {
                const nameInput = form.querySelector('#name');
                const emailInput = form.querySelector('#email');
                if (!nameInput.value.trim()) {
                    event.preventDefault();
                    alert('Please enter your name.');
                    nameInput.focus();
                    return;
                }
                if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
                    event.preventDefault();
                    alert('Please enter a valid email address.');
                    emailInput.focus();
                    return;
                }
                console.log('Form submission validated');
            });
        }

        // Set favicon dynamically
        const favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.href = config.icon;
        document.head.appendChild(favicon);

        // Check for specific element
        const element = document.querySelector('#some-id');
        if (element) {
            console.log(element.type);
        } else {
            console.error('Element not found');
        }
    } catch (error) {
        console.error('Error initializing section scripts:', error);
    }

    // Set CSS custom properties for the hero background and opacity
    document.documentElement.style.setProperty('--hero-background', `url(${config.heroBackground})`);
    document.documentElement.style.setProperty('--hero-opacity', config.heroBackgroundOpacity);

    // Set document title
    document.title = `${config.companyName} - Unleash Your Minx`;

    // Update CSS variables based on config.js
    const root = document.documentElement;

    root.style.setProperty('--primary-color', config.colors.primary);
    root.style.setProperty('--secondary-color', config.colors.secondary);
    root.style.setProperty('--background-color', config.colors.background);
    root.style.setProperty('--text-color', config.colors.text);
    root.style.setProperty('--accent-color', config.colors.accent);
    root.style.setProperty('--error-color', config.colors.error);
    root.style.setProperty('--hero-opacity', config.heroBackgroundOpacity);
    root.style.setProperty('--hero-background', `url(${config.heroBackground})`);
});

document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;

    // Set CSS variables for hero background, opacity, and gradient colors
    root.style.setProperty('--hero-background', `url(${config.heroBackground})`);
    root.style.setProperty('--hero-opacity', config.heroBackgroundOpacity);
    root.style.setProperty('--header-gradient-start', config.colors.headerGradientStart);
    root.style.setProperty('--header-gradient-end', config.colors.headerGradientEnd);
    root.style.setProperty('--header-gradient-opacity', config.colors.headerGradientOpacity);
});

document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;

    // Set CSS variables for hero background and opacity
    root.style.setProperty('--hero-background', `url(${config.heroBackground})`);
    root.style.setProperty('--hero-opacity', config.heroBackgroundOpacity);

    // Debugging logs
    console.log('Hero Background:', config.heroBackground);
    console.log('Hero Opacity:', config.heroBackgroundOpacity);
});

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');

    // Get gradient colors and opacity from config
    const gradientStart = config.colors.headerGradientStart;
    const gradientEnd = config.colors.headerGradientEnd;
    const gradientOpacity = config.colors.headerGradientOpacity;
    const heroBackground = `url(${config.heroBackground})`;

    // Dynamically set the header background
    header.style.background = `
        linear-gradient(
            rgba(${hexToRgb(gradientStart)}, ${gradientOpacity}),
            rgba(${hexToRgb(gradientEnd)}, ${gradientOpacity})
        ), ${heroBackground} center/cover no-repeat
    `;

    console.log('Header Background:', header.style.background);
});

// Helper function to convert HEX to RGB
function hexToRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
        : null;
}

document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;

    // Set CSS variables for gradient colors and opacity
    root.style.setProperty('--header-gradient-start-rgba', config.colors.headerGradientStartRgba);
    root.style.setProperty('--header-gradient-end-rgba', config.colors.headerGradientEndRgba);
    root.style.setProperty('--header-gradient-opacity', config.colors.headerGradientOpacity);
    root.style.setProperty('--hero-background', `url(${config.heroBackground})`);
    root.style.setProperty('--hero-opacity', config.heroBackgroundOpacity);
});

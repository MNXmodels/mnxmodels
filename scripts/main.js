document.addEventListener('DOMContentLoaded', () => {
    console.log('Config loaded:', config);

    // Replace placeholders in the HTML
    document.title = config.companyName; // Replace the title placeholder

    // Replace placeholders in the <head>
    document.head.innerHTML = document.head.innerHTML
        .replace(/{{stylesPath}}/g, config.paths.styles)
        .replace(/{{configPath}}/g, config.paths.config)
        .replace(/{{domPurifyPath}}/g, config.paths.domPurify)
        .replace(/{{mainScriptPath}}/g, config.paths.mainScript);

    // Replace placeholders in the <body>
    document.body.innerHTML = document.body.innerHTML
        .replace(/{{logoPath}}/g, config.logo);

    // Helper function to convert HEX to RGB
    const hexToRgb = (hex) => {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
            : null;
    };

    // Set CSS variables for colors and hero background
    const root = document.documentElement;
    root.style.setProperty('--primary-color', config.colors.primary);
    root.style.setProperty('--secondary-color', config.colors.secondary);
    root.style.setProperty('--background-color', config.colors.background);
    root.style.setProperty('--text-color', config.colors.text);
    root.style.setProperty('--accent-color', config.colors.accent);
    root.style.setProperty('--error-color', config.colors.error);
    root.style.setProperty('--hero-opacity', config.heroBackgroundOpacity);
    root.style.setProperty('--hero-background', `url(${config.heroBackground})`);
    root.style.setProperty('--header-gradient-start', config.colors.headerGradientStart);
    root.style.setProperty('--header-gradient-end', config.colors.headerGradientEnd);
    root.style.setProperty('--header-gradient-opacity', config.colors.headerGradientOpacity);

    // Dynamically set the header logo
    const header = document.querySelector('header');
    if (!header) {
        console.error('Header element not found');
        const newHeader = document.createElement('header');
        newHeader.innerHTML = `<img src="${config.logo}" alt="Company Logo" class="logo">`;
        document.body.prepend(newHeader);
    } else {
        header.innerHTML = `<img src="${config.logo}" alt="Company Logo" class="logo">`;
    }

    // Dynamically generate the footer with social icons
    const footer = document.querySelector('footer');
    if (!footer) {
        console.error('Footer element not found');
        const newFooter = document.createElement('footer');
        document.body.appendChild(newFooter);
    }
    if (footer) {
        const socialIcons = config.social;
        const socialHtml = Object.keys(socialIcons)
            .map((key) => {
                const { url, icon } = socialIcons[key];
                return `<a href="${url}" target="_blank">
                            <img src="${icon}" alt="${key}">
                        </a>`;
            })
            .join('');
        footer.innerHTML = `<div class="social-icons">${socialHtml}</div>`;
    }

    // Dynamically load sections
    const contentDiv = document.getElementById('content');
    if (!contentDiv) {
        console.error('Content div not found');
        return;
    }

    const sections = ['hero', 'about', 'services', 'join', 'footer'];
    for (const section of sections) {
        if (document.getElementById(section)) {
            console.warn(`Section "${section}" already exists. Skipping.`);
            continue;
        }

        try {
            const response = await fetch(`./sections/${section}.html`);
            if (!response.ok) throw new Error(`Failed to load ${section}.html`);
            let data = await response.text();

            // Replace placeholders with config values
            data = data.replace(/{{companyName}}/g, config.companyName)
                       .replace(/{{website}}/g, config.website)
                       .replace(/{{logo}}/g, config.logo)
                       .replace(/{{email}}/g, config.email)
                       .replace(/{{social.instagram.icon}}/g, config.social.instagram.icon)
                       .replace(/{{social.tiktok.icon}}/g, config.social.tiktok.icon)
                       .replace(/{{social.x.icon}}/g, config.social.x.icon)
                       .replace(/{{social.telegram.icon}}/g, config.social.telegram.icon)
                       .replace(/{{social.instagram.url}}/g, config.social.instagram.url)
                       .replace(/{{social.tiktok.url}}/g, config.social.tiktok.url)
                       .replace(/{{social.x.url}}/g, config.social.x.url)
                       .replace(/{{social.telegram.url}}/g, config.social.telegram.url);

            const sanitizedData = DOMPurify.sanitize(data);
            const div = document.createElement('div');
            div.id = section;
            div.innerHTML = sanitizedData;
            contentDiv.appendChild(div);
        } catch (error) {
            console.error(`Error loading section "${section}":`, error);
        }
    }
});
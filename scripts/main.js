document.addEventListener('DOMContentLoaded', async () => {
    const contentDiv = document.getElementById('content');
    if (!contentDiv) {
        console.error('Content div not found');
        return;
    }

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
                      .replace('{{social.x.icon}}', config.social.x.icon);
            console.log('After replacement:', data);

            const div = document.createElement('div');
            const sanitizedData = DOMPurify.sanitize(data);
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
});

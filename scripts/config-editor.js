// Load the current config values into the form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('config-form');

    // Load the current config values (mocked here, replace with actual fetch if needed)
    const config = {
        companyName: 'MNX Models',
        website: 'mnxmodels.com',
        email: 'join@mnxmodels.com',
        colors: {
            primary: '#6a1b9a',
            secondary: '#ff6f61',
            background: '#f3e5f5',
            text: '#212121',
            accent: '#ffd54f',
            error: '#d32f2f',
            headerGradientStart: '#ff69b4',
            headerGradientEnd: '#c71585'
        },
        heroBackground: '/assets/images/hero1.jpg',
        heroBackgroundOpacity: 0.7,
        logo: '/assets/images/logo.png',
        social: {
            instagram: {
                url: 'https://www.instagram.com/mnxmodels',
                icon: '/assets/icons/instagram.svg'
            },
            tiktok: {
                url: 'https://www.tiktok.com/@mnxmodels',
                icon: '/assets/icons/tiktok.svg'
            },
            x: {
                url: 'https://x.com/mnxmodels',
                icon: '/assets/icons/x.svg'
            },
            telegram: {
                url: 'https://t.me/mnxmodels',
                icon: '/assets/icons/telegram.svg'
            }
        }
    };

    // Populate the form with the current config values
    form.companyName.value = config.companyName;
    form.website.value = config.website;
    form.email.value = config.email;
    form.primary.value = config.colors.primary;
    form.secondary.value = config.colors.secondary;
    form.background.value = config.colors.background;
    form.text.value = config.colors.text;
    form.accent.value = config.colors.accent;
    form.error.value = config.colors.error;
    form.headerGradientStart.value = config.colors.headerGradientStart; // Populate gradient start
    form.headerGradientEnd.value = config.colors.headerGradientEnd; // Populate gradient end
    form.headerGradientOpacity.value = config.colors.headerGradientOpacity; // Populate gradient transparency
    form.heroBackground.value = config.heroBackground; // Populate hero background
    form.heroBackgroundOpacity.value = config.heroBackgroundOpacity; // Populate hero opacity
    form.logo.value = config.logo;

    // Populate social links
    form.instagramUrl.value = config.social.instagram.url;
    form.instagramIcon.value = config.social.instagram.icon;
    form.tiktokUrl.value = config.social.tiktok.url;
    form.tiktokIcon.value = config.social.tiktok.icon;
    form.xUrl.value = config.social.x.url;
    form.xIcon.value = config.social.x.icon;
    form.telegramUrl.value = config.social.telegram.url;
    form.telegramIcon.value = config.social.telegram.icon;

    // Save the updated config values
    document.getElementById('save-config').addEventListener('click', () => {
        const updatedConfig = {
            ...config, // Keep existing config values
            companyName: form.companyName.value,
            website: form.website.value,
            email: form.email.value,
            colors: {
                ...config.colors, // Keep existing color values
                primary: form.primary.value,
                secondary: form.secondary.value,
                background: form.background.value,
                text: form.text.value,
                accent: form.accent.value,
                error: form.error.value,
                headerGradientStart: form.headerGradientStart.value, // Include gradient start
                headerGradientEnd: form.headerGradientEnd.value,     // Include gradient end
                headerGradientOpacity: parseFloat(form.headerGradientOpacity.value) // Include gradient transparency
            },
            heroBackground: form.heroBackground.value, // Include hero background
            heroBackgroundOpacity: parseFloat(form.heroBackgroundOpacity.value), // Include hero opacity
            logo: form.logo.value,
            social: {
                instagram: {
                    url: form.instagramUrl.value,
                    icon: form.instagramIcon.value
                },
                tiktok: {
                    url: form.tiktokUrl.value,
                    icon: form.tiktokIcon.value
                },
                x: {
                    url: form.xUrl.value,
                    icon: form.xIcon.value
                },
                telegram: {
                    url: form.telegramUrl.value,
                    icon: form.telegramIcon.value
                }
            }
        };

        // Send the updated config to the backend
        fetch('/save-config', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedConfig)
        })
            .then((response) => {
                if (response.ok) {
                    alert('Config saved successfully!');
                } else {
                    alert('Failed to save config.');
                }
            })
            .catch((error) => {
                console.error('Error saving config:', error);
                alert('An error occurred while saving the config.');
            });
    });
});
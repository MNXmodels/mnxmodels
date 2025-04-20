#!/bin/bash

# Create config.js
cat > ~/Documents/mnxmodels/scripts/config.js << 'INNER'
const config = {
    companyName: 'Minx Models',
    website: 'mnxmodels.com',
    logo: '/assets/images/hero1.jpg',
    icon: '/assets/images/favicon.ico',
    email: 'join@mnxmodels.com',
    social: {
        instagram: 'https://www.instagram.com/mnxmodels',
        tiktok: 'https://www.tiktok.com/@mnxmodels',
        x: 'https://x.com/mnxmodels'
    }
};
INNER

# Update main.js
cat > ~/Documents/mnxmodels/scripts/main.js << 'INNER'
document.addEventListener('DOMContentLoaded', async () => {
    const contentDiv = document.getElementById('content');
    const sections = ['hero', 'about', 'services', 'join', 'footer'];

    // Load sections sequentially
    for (const section of sections) {
        try {
            const response = await fetch('./sections/' + section + '.html');
            if (!response.ok) throw new Error('Failed to load ' + section + '.html');
            let data = await response.text();

            // Replace placeholders with config values
            data = data.replace('{{companyName}}', config.companyName)
                      .replace('{{website}}', config.website)
                      .replace('{{logo}}', config.logo)
                      .replace('{{email}}', config.email)
                      .replace('{{social.instagram}}', config.social.instagram)
                      .replace('{{social.tiktok}}', config.social.tiktok)
                      .replace('{{social.x}}', config.social.x);

            const div = document.createElement('div');
            div.innerHTML = data;
            contentDiv.appendChild(div);
        } catch (error) {
            console.error('Error loading ' + section + '.html:', error);
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
        const form = document.querySelector('#join form');
        if (form) {
            form.addEventListener('submit', (event) => {
                const nameInput = form.querySelector('input[name="name"]');
                const emailInput = form.querySelector('input[name="email"]');
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
    } catch (error) {
        console.error('Error initializing section scripts:', error);
    }

    // Set CSS custom property for background image
    document.documentElement.style.setProperty('--hero-background', 'url(' + config.logo + ')');
});
INNER

# Update style.css
cat > ~/Documents/mnxmodels/styles/style.css << 'INNER'
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
}

body {
    background: linear-gradient(135deg, #ff69b4, #f0d5f0);
    color: #333;
}

/* Section Dividers */
section::before, footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    height: 3px;
    background: #ffd700;
    border-radius: 50%;
    opacity: 0.8;
    z-index: 1;
}

/* Fade-In Animation */
header, section, footer {
    opacity: 0;
    transform: translateY(20px);
}

header { animation: fadeIn 0.8s ease-out forwards 0.2s; }
#about { animation: fadeIn 0.8s ease-out forwards 0.4s; }
#services { animation: fadeIn 0.8s ease-out forwards 0.6s; }
#join { animation: fadeIn 0.8s ease-out forwards 0.8s; }
footer { animation: fadeIn 0.8s ease-out forwards 1s; }

@keyframes fadeIn {
    to { opacity: 1; transform: translateY(0); }
}

/* Header/Hero */
header {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #ff69b4, #c71585) var(--hero-background, url('/assets/images/hero1.jpg')) center/cover no-repeat;
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    padding: 1.5rem;
}

.logo {
    width: 120px;
    margin-bottom: 1rem;
    border: 2px solid #ffd700;
    border-radius: 10px;
    transition: transform 0.3s;
}

.logo:hover { transform: scale(1.1); }

header h1 {
    font-family: 'Pacifico', cursive;
    font-size: 3.5rem;
    margin-bottom: 1rem;
}

header p {
    font-size: 1.4rem;
    margin-bottom: 2rem;
}

.cta-button {
    background: #ffd700;
    color: #333;
    padding: 1rem 2rem;
    text-decoration: none;
    font-size: 1.2rem;
    border-radius: 25px;
    transition: background 0.3s;
}

.cta-button:hover { background: #ffec8b; }

/* Sections */
section {
    padding: 4rem 2rem;
    text-align: center;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

section h2 {
    font-family: 'Pacifico', cursive;
    font-size: 2.5rem;
    color: #ff69b4;
    margin-bottom: 1.5rem;
}

section p {
    max-width: 800px;
    margin: 0 auto;
    font-size: 1.1rem;
    line-height: 1.8;
}

/* About Section */
#about { background: #fff; }

/* Services Section */
#services { background: #d8bfd8; }

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.service-card {
    background: #fff;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.service-card h3 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 1rem;
}

.service-card p {
    font-size: 1rem;
    color: #666;
}

/* Join Section */
#join {
    background: #ff69b4;
    color: #fff;
}

#join form {
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

#join input, #join button {
    padding: 1rem;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
}

#join input { background: #fff; color: #333; }

#join button {
    background: #ffd700;
    color: #333;
    cursor: pointer;
    transition: background 0.3s;
}

#join button:hover { background: #ffec8b; }

/* Footer */
footer {
    padding: 2rem;
    background: #333;
    color: #fff;
    text-align: center;
}

footer a {
    color: #ffd700;
    text-decoration: none;
    margin: 0 0.5rem;
}

footer a:hover { color: #ffec8b; }

/* Responsive */
@media (max-width: 768px) {
    header h1 { font-size: 2.5rem; }
    header p { font-size: 1.2rem; }
    .logo { width: 100px; }
    section { padding: 3rem 1.5rem; }
    section h2 { font-size: 2rem; }
    .services-grid { grid-template-columns: 1fr; }
    #join form { gap: 0.8rem; }
    section::before, footer::before { width: 80%; }
}
INNER

# Update index.html
cat > ~/Documents/mnxmodels/index.html << 'INNER'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{companyName}} - Unleash Your Minx</title>
    <link rel="stylesheet" href="./styles/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Pacifico&display=swap" rel="stylesheet">
    <script src="./scripts/config.js"></script>
    <script src="./scripts/main.js"></script>
</head>
<body>
    <div id="content">
        <!-- Sections will be loaded here dynamically -->
    </div>
</body>
</html>
INNER

# Update hero.html
cat > ~/Documents/mnxmodels/sections/hero.html << 'INNER'
<header>
    <div class="hero-content">
        <img src="{{logo}}" alt="{{companyName}} Logo" class="logo">
        <h1>{{companyName}}</h1>
        <p>Flirt Soft, Shine Big—Unleash Your Minx!</p>
        <a href="#join" class="cta-button">Become a Minx</a>
    </div>
</header>
INNER

# Update about.html
cat > ~/Documents/mnxmodels/sections/about.html << 'INNER'
<section id="about">
    <h2>What Is {{companyName}}?</h2>
    <p>We’re your fierce, flirty partner in OnlyFans success. {{companyName}} empowers every woman—bold, naughty, YOU—to tease, glow, and thrive. From newbies to stars, we guide creators to captivate fans with minx-like charm and irresistible flair.</p>
</section>
INNER

# Update services.html
cat > ~/Documents/mnxmodels/sections/services.html << 'INNER'
<section id="services">
    <h2>Why Choose {{companyName}}?</h2>
    <div class="services-grid">
        <div class="service-card">
            <h3>Flirty Content Tips</h3>
            <p>Learn to tease like a Minx with personalized strategies for photos, videos, and more, designed to boost your fanbase.</p>
        </div>
        <div class="service-card">
            <h3>Fan Engagement</h3>
            <p>Master cheeky chats and loyal fans with our expert messaging support, keeping your OnlyFans buzzing.</p>
        </div>
        <div class="service-card">
            <h3>Brand Glow-Up</h3>
            <p>From sultry logos to social media plans, we craft your Minx vibe to shine across platforms.</p>
        </div>
    </div>
</section>
INNER

# Update join.html
cat > ~/Documents/mnxmodels/sections/join.html << 'INNER'
<section id="join">
    <h2>Join the Minx Vibe</h2>
    <p>Ready to flirt, shine, and earn? Sign up to start your naughty journey with {{companyName}}—no experience needed, just your unique spark!</p>
    <form action="mailto:{{email}}" method="post" enctype="text/plain">
        <input type="text" name="name" placeholder="Your Name" required>
        <input type="email" name="email" placeholder="Your Email" required>
        <input type="text" name="onlyfans" placeholder="OnlyFans Handle (Optional)">
        <button type="submit">Let’s Get Flirty!</button>
    </form>
</section>
INNER

# Update footer.html
cat > ~/Documents/mnxmodels/sections/footer.html << 'INNER'
<footer>
    <p>© 2025 {{companyName}}. All rights reserved.</p>
    <p>
        <a href="{{social.instagram}}" target="_blank">Instagram</a> |
        <a href="{{social.tiktok}}" target="_blank">TikTok</a> |
        <a href="{{social.x}}" target="_blank">X</a>
    </p>
</footer>
INNER

echo "Updated configuration files"

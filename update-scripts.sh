#!/bin/bash
cat > ~/Desktop/mnxmodels/scripts/main.js << 'INNER'
document.addEventListener('DOMContentLoaded', async () => {
    const contentDiv = document.getElementById('content');
    const sections = ['hero', 'about', 'services', 'join', 'footer'];
    for (const section of sections) {
        try {
            const response = await fetch(\`./sections/\${section}.html\`);
            if (!response.ok) throw new Error(\`Failed to load \${section}.html\`);
            const data = await response.text();
            const div = document.createElement('div');
            div.innerHTML = data;
            contentDiv.appendChild(div);
        } catch (error) {
            console.error(\`Error loading \${section}.html:\`, error);
        }
    }
    try {
        const logo = document.querySelector('.hero-content .logo');
        if (logo) {
            logo.addEventListener('mouseover', () => {
                logo.style.transform = 'scale(1.1) rotate(5deg)';
            });
            logo.addEventListener('mouseout', () => {
                logo.style.transform = 'scale(1)';
            });
        }
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
    } catch (error) {
        console.error('Error initializing section scripts:', error);
    }
});
INNER
echo "Updated main.js"

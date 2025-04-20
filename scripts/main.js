document.addEventListener('DOMContentLoaded', async () => {
    const contentDiv = document.getElementById('content');
    const sections = ['hero', 'about', 'services', 'join', 'footer']; // Ensure the order is correct

    // Load sections sequentially
    for (const section of sections) {
        try {
            const response = await fetch(`/sections/${section}.html`);
            if (!response.ok) throw new Error(`Failed to load ${section}.html`);
            const data = await response.text();
            const div = document.createElement('div');
            div.innerHTML = data;
            contentDiv.appendChild(div);
        } catch (error) {
            console.error(`Error loading ${section}.html:`, error);
        }
    }
});
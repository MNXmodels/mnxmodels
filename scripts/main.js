document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const sections = ['hero', 'about', 'services', 'join', 'footer'];

    // Load each section HTML file
    sections.forEach(section => {
        fetch(`./sections/${section}.html`)
            .then(response => response.text())
            .then(data => {
                const div = document.createElement('div');
                div.innerHTML = data;
                contentDiv.appendChild(div);
            })
            .catch(error => console.error(`Error loading ${section}.html:`, error));
    });
});
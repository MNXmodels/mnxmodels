const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to save the updated config
app.post('/save-config', (req, res) => {
    const updatedConfig = req.body;

    // Path to the config.js file
    const configPath = path.join(__dirname, 'scripts', 'config.js');

    // Convert the updated config to a JavaScript object string
    const configContent = `const config = ${JSON.stringify(updatedConfig, null, 4)};`;

    // Write the updated config to the config.js file
    fs.writeFile(configPath, configContent, (err) => {
        if (err) {
            console.error('Error saving config:', err);
            return res.status(500).send('Failed to save config.');
        }
        console.log('Config saved successfully!');
        res.send('Config saved successfully!');
    });
});

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).send("Page not found");
});

// Handle other errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
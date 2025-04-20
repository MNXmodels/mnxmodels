#!/bin/bash

# Update index.html
cat > ~/Documents/mnxmodels/index.html << 'INNER'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minx Models - Unleash Your Minx</title>
    <link rel="stylesheet" href="./styles/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Pacifico&display=swap" rel="stylesheet">
</head>
<body>
    <div id="content">
        <!-- Sections will be loaded here dynamically -->
    </div>
    <script src="./scripts/main.js"></script>
</body>
</html>
INNER

echo "Updated index.html"
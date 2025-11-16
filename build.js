const fs = require('fs').promises;
const path = require('path');

async function build() {
    try {
        // Define paths
        const talksPath = path.join(__dirname, 'talks.json');
        const htmlTemplatePath = path.join(__dirname, 'src', 'index.html');
        const cssPath = path.join(__dirname, 'src', 'style.css');
        const jsPath = path.join(__dirname, 'src', 'script.js');
        const outputPath = path.join(__dirname, 'dist', 'index.html');

        // Read files
        const talksData = await fs.readFile(talksPath, 'utf8');
        let htmlTemplate = await fs.readFile(htmlTemplatePath, 'utf8');
        const cssContent = await fs.readFile(cssPath, 'utf8');
        let jsContent = await fs.readFile(jsPath, 'utf8');

        // Inject data and assets
        jsContent = jsContent.replace('/* TALKS_DATA_PLACEHOLDER */', talksData);
        htmlTemplate = htmlTemplate.replace('/* CSS_PLACEHOLDER */', cssContent);
        htmlTemplate = htmlTemplate.replace('// SCRIPT_PLACEHOLDER', jsContent);

        // Write the final HTML file
        await fs.writeFile(outputPath, htmlTemplate);
        console.log('Successfully built single-page website to dist/index.html');

    } catch (error) {
        console.error('Error during build process:', error);
    }
}

build();

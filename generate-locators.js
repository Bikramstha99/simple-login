const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const chokidar = require('chokidar');

const loginHtmlPath = path.join(__dirname, 'src', 'app', 'login', 'login.component.html');
const dashboardHtmlPath = path.join(__dirname, 'src', 'app', 'dashboard', 'dashboard.component.html');
const outputPath = path.join(
  'C:/Users/bikramshrestha/Desktop/Self-healing/self-healing-automation-ai',
  'locators.json'
);

const extractLocatorsFromHtml = (htmlContent, pageName) => {
  const $ = cheerio.load(htmlContent);
  const locators = {};

  // Extract input fields
  $('input').each((i, el) => {
    const id = $(el).attr('id');
    const name = $(el).attr('name');
    if (id) {
      const key = `${pageName}_${name || id}Input`;
      locators[key] = `#${id}`;
    }
  });

  // Extract buttons
  $('button').each((i, el) => {
    const id = $(el).attr('id');
    const text = $(el).text().trim().toLowerCase().replace(/\s+/g, '');
    if (id) {
      const key = `${pageName}_${text || id}Button`;
      locators[key] = `#${id}`;
    }
  });

  // Extract headings and paragraphs with IDs
  $('h1,h2,h3,h4,h5,h6,p,div,span').each((i, el) => {
    const id = $(el).attr('id');
    if (id) {
      const key = `${pageName}_${id}`;
      locators[key] = `#${id}`;
    }
  });

  return locators;
};

const generateLocators = () => {
  const locators = {};

  const loginHtml = fs.readFileSync(loginHtmlPath, 'utf8');
  const dashboardHtml = fs.readFileSync(dashboardHtmlPath, 'utf8');

  Object.assign(locators, extractLocatorsFromHtml(loginHtml, 'login'));
  Object.assign(locators, extractLocatorsFromHtml(dashboardHtml, 'dashboard'));

  fs.writeFileSync(outputPath, JSON.stringify(locators, null, 2));
  console.log('✅ Locators generated at:', outputPath);
};

generateLocators();

chokidar.watch(path.join(__dirname, 'src', 'app', '**', '*.html')).on('change', (filePath) => {
  console.log(`File changed: ${filePath}. Regenerating locators...`);
  generateLocators();
});

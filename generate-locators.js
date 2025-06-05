const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const chokidar = require('chokidar'); 

const loginHtmlPath = path.join(__dirname, 'src', 'app', 'login', 'login.component.html');  // Path to your login component HTML file
const dashboardHtmlPath = path.join(__dirname, 'src', 'app', 'dashboard', 'dashboard.component.html');  // Path to your dashboard component HTML file
const outputPath = path.join(
  'C:/Users/bikrams/Desktop/Self-healing/self-healing-automation-ai',
  'locators.json'
);

const generateLocators = () => {
  const locators = {};

  const loginHtml = fs.readFileSync(loginHtmlPath, 'utf8');
  const $login = cheerio.load(loginHtml);

  $login('input').each((i, el) => {
    const id = $login(el).attr('id');
    const name = $login(el).attr('name');

    if (id) {
      const key = `${name || id}Input`;
      locators[key] = id;
    }
  });

  $login('button[type="submit"]').each((i, el) => {
    const text = $login(el).text().trim().toLowerCase().replace(/\s+/g, '');
    const key = `${text}Button`;
    locators[key] = 'button[type="submit"]';
  });

  const dashboardHtml = fs.readFileSync(dashboardHtmlPath, 'utf8');
  const $dashboard = cheerio.load(dashboardHtml);

  $dashboard('#dashboard').each((i, el) => {
    locators.dashboard = 'dashboard';
  });

  $dashboard('#dashboard-title').each((i, el) => {
    locators.dashboardTitle = 'dashboard-title';
  });

  $dashboard('#add-card-button').each((i, el) => {
    locators.addCardButton = 'add-card-button';
  });

  $dashboard('#cards-container').each((i, el) => {
    locators.cardsContainer = 'cards-container';
  });

  $dashboard('.card').each((i, el) => {
    const key = `card${i + 1}`;
    locators[key] = `.card:nth-of-type(${i + 1})`;
  });

  $dashboard('h2[id^="card-title-"]').each((i, el) => {
    const id = $dashboard(el).attr('id');
    locators[id] = `${id}`;
  });

  $dashboard('p[id^="card-content-"]').each((i, el) => {
    const id = $dashboard(el).attr('id');
    locators[id] = `${id}`;
  });

  $dashboard('button[id^="delete-card-button-"]').each((i, el) => {
    const id = $dashboard(el).attr('id');
    locators[id] = `${id}`;
  });

  fs.writeFileSync(outputPath, JSON.stringify(locators, null, 2));
  console.log('✅ Locators generated at:', outputPath);
};

generateLocators();

chokidar.watch(path.join(__dirname, 'src', 'app', '**', '*.html')).on('change', (filePath) => {
  console.log(`File changed: ${filePath}. Regenerating locators...`);
  generateLocators();  
});

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio'); 

const htmlPath = path.join(__dirname, 'src', 'app', 'login', 'login.component.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const $ = cheerio.load(html);

const locators = {};

$('input').each((i, el) => {
  const id = $(el).attr('id');
  const type = $(el).attr('type');
  const name = $(el).attr('name');

  if (id) {
    const key = `${name || id}Input`;
    locators[key] = id;
  }
});

$('button[type="submit"]').each((i, el) => {
  const text = $(el).text().trim().toLowerCase().replace(/\s+/g, '');
  const key = `${text}Button`;
  locators[key] = 'button[type="submit"]';
});

const outputPath = path.join(
  'C:/Users/Acer/OneDrive/Desktop/Self-healing/self-heating-automation-ai',
  'locators.json'
);

fs.writeFileSync(outputPath, JSON.stringify(locators, null, 2));

// console.log('✅ Locators generated at:', outputPath);

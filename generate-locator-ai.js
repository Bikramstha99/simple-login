const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const filePath = './src/app/login/login.component.html';

const content = fs.readFileSync(filePath, 'utf-8');
const $ = cheerio.load(content);

const locators = [];

$('input, button').each((i, el) => {
  const tag = el.tagName;
  const id = $(el).attr('id') || null;
  const name = $(el).attr('name') || null;
  const type = $(el).attr('type') || null;
  const text = $(el).text() || null;

  locators.push({
    tag,
    id,
    name,
    type,
    text,
  });
});

const outputPath = path.join(
  'C:/Users/Acer/OneDrive/Desktop/Self-healing/self-heating-automation-ai',
  'locators_ai.json'
);

// Write to locators.json in the target directory
fs.writeFileSync(outputPath, JSON.stringify(locators, null, 2));

// console.log('✅ Locators generated at:', outputPath);

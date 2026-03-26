const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'src');

const replacements = [
  { search: /--primary-orange-hover/g, replace: '--primary-green-hover' },
  { search: /--primary-orange/g, replace: '--primary-green' },
  { search: /#f26d21/gi, replace: '#10b981' },
  { search: /#d15815/gi, replace: '#059669' },
  { search: /%23f26d21/gi, replace: '%2310b981' },
  { search: /rgba\(242,\s*109,\s*33/g, replace: 'rgba(16, 185, 129' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.css') || file.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      for (const { search, replace } of replacements) {
        if (search.test(content)) {
          content = content.replace(search, replace);
          modified = true;
        }
      }
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(directory);
console.log('Color replacement complete.');

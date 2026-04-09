const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walk(dirPath, callback);
    } else {
      if (dirPath.endsWith('.css')) {
        callback(dirPath);
      }
    }
  });
}

let modifiedCssCount = 0;

walk(path.join(__dirname, 'app'), (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('@apply') && !content.includes('@reference "tailwindcss"')) {
    content = '@reference "tailwindcss";\n' + content;
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedCssCount++;
  }
});

console.log('Added @reference to CSS files:', modifiedCssCount);

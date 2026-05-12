const fs = require('fs');
const path = require('path');

const cssFixMap = {
  'font-size:\\s*var\\(--text-xs\\);?': '@apply text-xs;',
  'font-size:\\s*var\\(--text-sm\\);?': '@apply text-sm;',
  'font-size:\\s*var\\(--text-base\\);?': '@apply text-base;',
  'font-size:\\s*var\\(--text-lg\\);?': '@apply text-lg;',
  'font-size:\\s*var\\(--text-xl\\);?': '@apply text-xl;',
  'font-size:\\s*var\\(--text-2xl\\);?': '@apply text-2xl;',
  'font-size:\\s*var\\(--text-3xl\\);?': '@apply text-3xl;',
  'font-size:\\s*var\\(--text-4xl\\);?': '@apply text-4xl;',
  'font-size:\\s*var\\(--text-5xl\\);?': '@apply text-5xl;'
};

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
  let original = content;
  
  for (const [key, value] of Object.entries(cssFixMap)) {
    content = content.replace(new RegExp(key, 'g'), value);
  }
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedCssCount++;
  }
});

console.log('Fixed CSS files:', modifiedCssCount);

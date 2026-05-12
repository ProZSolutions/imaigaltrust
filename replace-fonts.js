const fs = require('fs');
const path = require('path');

const tsxMap = {
  'text-\\[12px\\]': 'text-xs',
  'text-\\[14px\\]': 'text-sm',
  'text-\\[16px\\]': 'text-base',
  'text-\\[18px\\]': 'text-lg',
  'text-\\[20px\\]': 'text-xl',
  'text-\\[24px\\]': 'text-2xl',
  'text-\\[30px\\]': 'text-3xl',
  'text-\\[36px\\]': 'text-4xl',
  'text-\\[48px\\]': 'text-5xl',
  'text-\\[60px\\]': 'text-6xl',
  'text-\\[72px\\]': 'text-7xl',
};

const cssMap = {
  'font-size:\\s*12px;?': 'font-size: var(--text-xs);',
  'font-size:\\s*14px;?': 'font-size: var(--text-sm);',
  'font-size:\\s*16px;?': 'font-size: var(--text-base);',
  'font-size:\\s*18px;?': 'font-size: var(--text-lg);',
  'font-size:\\s*20px;?': 'font-size: var(--text-xl);',
  'font-size:\\s*24px;?': 'font-size: var(--text-2xl);',
  'font-size:\\s*30px;?': 'font-size: var(--text-3xl);',
  'font-size:\\s*36px;?': 'font-size: var(--text-4xl);',
  'font-size:\\s*48px;?': 'font-size: var(--text-5xl);'
};

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walk(dirPath, callback);
    } else {
      if (dirPath.endsWith('.tsx') || dirPath.endsWith('.jsx') || dirPath.endsWith('.ts') || dirPath.endsWith('.css')) {
        callback(dirPath);
      }
    }
  });
}

let modifiedTsxCount = 0;
let modifiedCssCount = 0;

walk(path.join(__dirname, 'app'), (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  if (filePath.endsWith('.css')) {
    for (const [key, value] of Object.entries(cssMap)) {
      content = content.replace(new RegExp(key, 'g'), value);
    }
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      modifiedCssCount++;
    }
  } else {
    for (const [key, value] of Object.entries(tsxMap)) {
      content = content.replace(new RegExp(key, 'g'), value);
    }
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      modifiedTsxCount++;
    }
  }
});

console.log('Modified TSX files:', modifiedTsxCount);
console.log('Modified CSS files:', modifiedCssCount);

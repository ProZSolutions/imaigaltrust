const fs = require('fs');
const path = require('path');

function getPixelValue(word) {
  const match = word.match(/text-\[([0-9]+)px\]/);
  if (match) return parseInt(match[1]);
  if (word.includes('text-xs')) return 12;
  if (word.includes('text-sm')) return 14;
  if (word.includes('text-base')) return 16;
  if (word.includes('text-lg')) return 18;
  if (word.includes('text-xl')) return 20;
  if (word.includes('text-2xl')) return 24;
  if (word.includes('text-3xl')) return 30;
  if (word.includes('text-4xl')) return 36;
  if (word.includes('text-5xl')) return 48;
  return null;
}

function getFluidClass(maxPx) {
  if (maxPx <= 12) return 'text-xs';
  if (maxPx <= 14) return 'text-sm';
  if (maxPx <= 17) return 'text-base';
  if (maxPx <= 18) return 'text-lg';
  if (maxPx <= 20) return 'text-xl';
  if (maxPx <= 24) return 'text-1xl'; // wait, fallback logic
  if (maxPx <= 28) return 'text-2xl'; // fs-2xl goes to 36px
  if (maxPx <= 40) return 'text-3xl'; // fs-3xl goes to 48px
  return 'text-4xl'; // fs-4xl goes to 64px
}

function processClassName(classNameStr) {
  const words = classNameStr.split(/\s+/);
  const keeplist = [];
  let maxPx = 0;
  let hasTextSize = false;

  for (const w of words) {
    if (!w) continue;
    
    // Check if it's a sizing/leading class
    const isSizing = /^((sm|md|lg|xl|2xl):)?text-(\[[0-9]+px\]|xs|sm|base|lg|xl|2xl|3xl|4xl|5xl)$/.test(w);
    const isLeading = /^((sm|md|lg|xl|2xl):)?leading-(\[[0-9]+px\]|none|tight|snug|normal|relaxed|loose)$/.test(w);

    if (isSizing) {
      const px = getPixelValue(w);
      if (px && px > maxPx) maxPx = px;
      hasTextSize = true;
    } else if (isLeading) {
      // we discard leading since fluid classes carry line height
    } else {
      keeplist.push(w);
    }
  }

  if (hasTextSize && maxPx > 0) {
    let optimalClass = 'text-base';
    if (maxPx <= 14) optimalClass = 'text-xs';
    else if (maxPx <= 16) optimalClass = 'text-sm';
    else if (maxPx <= 18) optimalClass = 'text-base';
    else if (maxPx <= 23) optimalClass = 'text-lg';
    else if (maxPx <= 29) optimalClass = 'text-xl';
    else if (maxPx <= 38) optimalClass = 'text-2xl';
    else if (maxPx <= 48) optimalClass = 'text-3xl';
    else optimalClass = 'text-4xl';

    keeplist.push(optimalClass);
  }

  return keeplist.join(' ');
}

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walk(dirPath, callback);
    } else {
      if (dirPath.endsWith('.tsx') || dirPath.endsWith('.jsx')) {
        callback(dirPath);
      }
    }
  });
}

let modifiedTsxCount = 0;

walk(path.join(__dirname, 'app'), (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  // Find all className="..." or className={`...`}
  content = content.replace(/className=(["'])(.*?)\1/g, (match, quote, classStr) => {
    return 'className=' + quote + processClassName(classStr) + quote;
  });

  content = content.replace(/className=\{`(.*?)`\}/g, (match, classStr) => {
    // skip if there are complex interpolations inside sizing
    if (classStr.includes('${')) return match; 
    return 'className={`' + processClassName(classStr) + '`}';
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedTsxCount++;
  }
});

console.log('Refactored classes in TSX files:', modifiedTsxCount);

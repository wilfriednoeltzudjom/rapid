const fs = require('fs');
const pug = require('pug');

const readFileAsync = (fileName, folder, ext = 'pug') => {
  return new Promise((resolve, reject) => {
    fs.readFile(`./public/${folder ? `${folder}/` : ''}${fileName}.${ext}`, 'utf8', (err, contents) => {
      if (err) {
        return resolve(readFileAsync(fileName, 'html'));
      }
        
      resolve(pug.render(contents));
    })
  })
}

module.exports = readFileAsync;
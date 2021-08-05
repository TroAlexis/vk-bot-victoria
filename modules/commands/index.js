const { getFiles } = require('~/helpers/files');

getFiles('**/!(index|*.test).js', { cwd: __dirname })
  .forEach((filePath) => {
    const fileName = require('path')
      .basename(filePath)
      .replace(/\.js$/, '');
    exports[fileName] = require(`./${filePath}`);
  });

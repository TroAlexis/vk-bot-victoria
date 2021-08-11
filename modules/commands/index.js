const { getFiles } = require('~/helpers/files');

exports.default = {};

getFiles('**/!(index|*.test).js', { cwd: __dirname })
  .forEach((filePath) => {
    const fileName = require('path')
      .basename(filePath)
      .replace(/\.js$/, '');
    exports.default[fileName] = require(`./${filePath}`).default;
  });

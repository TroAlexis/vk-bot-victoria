/**
 * Import all modules
 */

const { getDirectories } = require('~/helpers/files');

getDirectories(require('path').join(__dirname, './')).forEach((dirname) => {
  if (!dirname.includes('test')) {
    exports[dirname] = require(`./${dirname}`).default;
  }
});

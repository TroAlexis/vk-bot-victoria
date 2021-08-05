const glob = require('glob');
const { readdirSync } = require('fs');

function getFiles(globPattern, globOptions) {
  return glob.sync(globPattern, globOptions);
}

const getDirectories = (source) => readdirSync(source, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

module.exports = {
  getFiles,
  getDirectories,
};

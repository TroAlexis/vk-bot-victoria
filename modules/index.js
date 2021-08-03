const path = require('path');
const glob = require('glob');

/**
 * Import all commands
 */
export const commands = {};

glob.sync('./modules/commands/**/*.js').forEach((filePath) => {
  const fileName = path.basename(filePath).replace('.js', '');
  commands[fileName] = require(path.resolve(filePath)).default;
});

export default {
  commands,
};

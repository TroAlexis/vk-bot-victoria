const { getDirectories } = require('~/helpers/files');
const modules = require('~/modules');

const allModules = getDirectories(require('path').join(__dirname, '..'))
  .filter((module) => module !== '__tests__');

test.each(allModules)('contains %s module', (module) => {
  expect(modules).toHaveProperty(module);
});

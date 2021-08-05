const { getDirectories } = require('~/helpers/files');
const modules = require('~/modules');

const allModules = getDirectories(require('path').join(__dirname, '..'));

describe.each(allModules)('Modules', (module) => {
  if (module !== '__tests__') {
    test(`contains ${module} module`, () => {
      expect(modules).toHaveProperty(module);
    });
  }
});

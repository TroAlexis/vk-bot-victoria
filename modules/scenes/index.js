const Stage = require('node-vk-bot-api/lib/stage');
const Scene = require('node-vk-bot-api/lib/scene');
const { getFiles } = require('~/helpers/files');

const scenes = getFiles('**/!(index|*.test).js', { cwd: __dirname })
  .map((filePath) => require(`./${filePath}`).default);
const stageScenes = scenes.map(({ name, steps }) => new Scene(name, ...steps));

module.exports.default = new Stage(...stageScenes);
module.exports.scenes = scenes;

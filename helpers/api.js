const api = require('node-vk-bot-api/lib/api');

module.exports = (method, settings) => api(method, {
  ...settings,
  access_token: process.env.TOKEN,
});

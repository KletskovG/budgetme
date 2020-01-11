// TODO: refactor: make it all automatic

const helpCommand = require('./help');
const courseCommand = require('./course');
const startCommand = require('./start');

function registerCommands(bot) {
  helpCommand(bot);
  courseCommand(bot);
  startCommand(bot);
}

module.exports = registerCommands;
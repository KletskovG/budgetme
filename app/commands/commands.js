const helpCommand = require('./help');
const courseCommand = require('./course');

function registerCommands(bot) {
  helpCommand(bot);
  courseCommand(bot);
}

module.exports = registerCommands;
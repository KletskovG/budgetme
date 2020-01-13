// TODO: refactor: make it all automatic

import courseCommand from './course';
import helpCommand from './help';
import startCommand from './start';

function registerCommands(bot) {
  helpCommand(bot);
  courseCommand(bot);
  startCommand(bot);
}

export default registerCommands;

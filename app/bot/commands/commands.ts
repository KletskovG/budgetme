// TODO: refactor: make it all automatic

import courseCommand from './course';
import helpCommand from './help';
import start from './start';

function registerCommands(bot) {
  helpCommand(bot);
  courseCommand(bot);
  start(bot);
}

export default registerCommands;

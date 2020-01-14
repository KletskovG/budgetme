// TODO: refactor: make it all automatic

import courseCommand from './course';
import helpCommand from './help';

function registerCommands(bot) {
  helpCommand(bot);
  courseCommand(bot);
}

export default registerCommands;

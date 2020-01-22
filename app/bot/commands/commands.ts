// TODO: refactor: make it all automatic

import courseCommand from './course';
import helpCommand from './help';
import start from './start';
import income from './income';
import expense from './expense';

function registerCommands(bot) {
  helpCommand(bot);
  courseCommand(bot);
  start(bot);
  income(bot);
  expense(bot);
}

export default registerCommands;

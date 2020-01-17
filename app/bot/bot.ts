
import TelegramBot from 'node-telegram-bot-api';
import config from '../config';
import registerCommand from './commands/commands';
import fetch from 'node-fetch';
import Logger from '../server/core/Logger';

const bot = new TelegramBot(config.token,{ polling: true });
const logger = Logger.getInstance();

registerCommand(bot);
console.log('Bot is up and running');
logger.log('Bot is up and running');

setTimeout(() => {
  fetch(`http://localhost:${config.PORT}/health`)
    .then(res => {
      console.log('Server is checked');
      logger.log('Server is checked');
      return true;
    })
    .catch((err: Error) => {
      console.log(err);
      console.log('SERVER IS DEAD OR UNAVAILABEL');
      return false;
    });
}, 3000);
export default bot;

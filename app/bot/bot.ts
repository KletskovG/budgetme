
import TelegramBot from 'node-telegram-bot-api';
import config from '../config';
import registerCommand from './commands/commands';
import fetch from 'node-fetch';

const bot = new TelegramBot(config.token,{ polling: true });

registerCommand(bot);
console.log('Bot is up and running');

setTimeout(() => {
  fetch(`http://localhost:${config.PORT}/health`)
    .then(res => {
      console.log('Server is checked');
      console.log(res.json());
      return true;
    })
    .catch((err: Error) => {
      console.log(err);
      console.log('SERVER IS DEAD OR UNAVAILABEL');
      return false;
    });
}, 3000);
export default bot;

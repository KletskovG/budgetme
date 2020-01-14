
import TelegramBot from 'node-telegram-bot-api';
import config from '../config';
import registerCommand from './commands/commands';

const bot = new TelegramBot(config.token,{ polling: true });

registerCommand(bot);
console.log('Bot is up and running');

export default bot;

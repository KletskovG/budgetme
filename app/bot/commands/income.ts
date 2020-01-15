import TelegramBot = require('node-telegram-bot-api');
import fetch from 'node-fetch';
import config from '../../config';
import { isNumber } from 'util';

function income(bot: TelegramBot) {
  const store = {
    isIncomeEnabled: false,
  };

  bot.onText(/income/, (msg, match) => {
    const chatId = msg.chat.id;
    store.isIncomeEnabled = true;
    bot.sendMessage(chatId, 'Please, send me amount and category');
  });

  bot.onText(/(.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Received message');
    console.log(`Store : ${store};`)
    console.log(`Number ${Number(msg.text)}`);
    
    if (store.isIncomeEnabled && Number(msg.text) > 0) {
      // bot.sendMessage(chatId, `Amount: ${number}, category: ${category}`);
      bot.sendMessage(chatId, `You income is  ${msg.text}`);

      store.isIncomeEnabled = false;
    }
  });
} 

export default income;

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

  bot.onText(/^([1-9]) (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    
    if (store.isIncomeEnabled) {
      const { text } = msg;
      let number = '';
      let category = '';
      
      text.split('').forEach((char: string) => {
        if (isNumber(+char)) {
          number += Number(char);
        } else {
          category += char;
        }
      });

      bot.sendMessage(chatId, `Amount: ${number}, category: ${category}`);

      store.isIncomeEnabled = false;
    }
  });
} 

export default income;

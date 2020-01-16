import TelegramBot = require('node-telegram-bot-api');
import fetch from 'node-fetch';
import config from '../../config';
import User from '../../models/User/User';

function income(bot: TelegramBot) {

  bot.onText(/income/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Please, send me amount and category');
  });

  bot.onText(/(.+)/, (msg, match) => {
    const chatId = msg.chat.id;

    const user = new User();
    user.findFromDB(msg)
      .then((findedUser) => {
        console.log(findedUser);
        bot.sendMessage(chatId, findedUser.username);
      })
      .catch((err: Error) => {
        console.log(err);
        bot.sendMessage(chatId, `${err}`);
      });
  });
}

export default income;

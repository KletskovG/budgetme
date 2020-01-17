import TelegramBot = require('node-telegram-bot-api');
import fetch from 'node-fetch';
import config from '../../config';
import User from '../../models/User/User';
import Logger from '../../server/core/Logger';

function income(bot: TelegramBot) {
  const logger = Logger.getInstance();

  bot.onText(/income/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Please, send me amount of transaction');

    const user = new User();
    console.log('TRYING TO UPDATE INCOME');
    logger.log('TRYING TO UPDATE INCOME OF ' + msg.from.username);
  });

  bot.onText(/(.+)/, (msg, match) => {
    const chatId = msg.chat.id;

    const user = new User();
    user.findFromDB(msg)
      .then((findedUser) => {
        console.log(findedUser);
        if (findedUser.store.isIncomeEnabled) {
          bot.sendMessage(chatId, findedUser.username);
        }
      })
      .catch((err: Error) => {
        console.log(err);
        bot.sendMessage(chatId, `${err}`);
      });
  });
}

export default income;

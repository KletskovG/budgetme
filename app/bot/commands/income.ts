import TelegramBot = require('node-telegram-bot-api');
import fetch from 'node-fetch';
import config from '../../config';
import User from '../../models/User/User';
import Logger from '../../server/core/Logger';

function income(bot: TelegramBot) {
  const logger = Logger.getInstance();

  bot.onText(/income/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Please, send me amount and category');

    const user = new User();
    console.log('TRYING TO UPDATE INCOME');
    logger.log('TRYING TO UPDATE INCOME OF ' + msg.from.username);
    user.findFromDB(msg)
      .then((findedUser) => {
        if (findedUser.store.isIncomeEnabled === false) {
          findedUser.store.isIncomeEnabled = true;
          user.update(findedUser, findedUser)
            .then(updatedUser => {
              const storeString = `Store.isIncomeEnabled: ${updatedUser.store.isIncomeEnabled}`;
              logger.log('USER WAS UPDATED');
              logger.log(updatedUser.username + ' ' + user.store.isIncomeEnabled);
              bot.sendMessage(chatId, storeString);
            })
            .catch(err => bot.sendMessage(chatId, err));
        }
      })
      .catch((err: Error) => {
        console.log(err);
        bot.sendMessage(chatId, 'There was en error');
        bot.sendMessage(chatId, `${err}`);
      });
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

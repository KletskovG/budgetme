import TelegramBot = require('node-telegram-bot-api');
import fetch from 'node-fetch';
import config from '../../config';
import User from '../../models/User/User';
import Logger from '../../server/core/Logger';
import UserModel, { IUser } from '../../models/User/UserModel';
const logger = Logger.getInstance();

function income(bot: TelegramBot) {
  bot.onText(/income/, async (msg, match) => {
    const chatId = msg.chat.id;
    const incomeRequirementsString = 'Please send me amount of transaction';
    bot.sendMessage(chatId, incomeRequirementsString);
    updateStorage(chatId, msg, true);
  });

  bot.onText(/(.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const user = await UserModel.findOne({ id: msg.from.id });
    const isIncome = msg.text.includes('income');
    if (user.store.isIncomeEnabled && isIncome === false) {
      updateWallet(chatId, msg);
      updateStorage(chatId, msg, false);
    } else {
      logger.log('Dont respond to not income message');
    }
  });

  function updateStorage(chatId: number, msg: TelegramBot.Message, isIncomeEnabled): void {
    const data = {
      id: msg.from.id,
      isIncomeEnabled,
    };
    fetch(`http://localhost:${config.PORT}/income/store`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).catch((err: Error) => {
      bot.sendMessage(chatId, `${err} Telegram`);
      logger.log(`Error: Telegram cant update isIncome store ${msg.from.id}`);
    });
  }

  function updateWallet(chatId: number, msg: TelegramBot.Message): void {
    const amount = Number(msg.text);
    if (!!amount && amount > 0) {
      const data = {
        id: msg.from.id,
        income: amount,
      };
      fetch(`http://localhost:${config.PORT}/income`, {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((res: Response) => res.json())
      .then((res: IUser) => {
        const userName = res.username;
        const walletAmount = res.wallet.amount;

        bot.sendMessage(chatId, `${userName} \n Your amount is ${walletAmount}`);
      })
      .catch((err: Error) => logger.log(`Error: Telegram ${err} (income)`));
    }
  }

}
export default income;

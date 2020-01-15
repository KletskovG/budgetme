import TelegramBot = require('node-telegram-bot-api');
import IUser from 'app/models/User/IUser';
import User from '../../models/User/User';
import fetch from 'node-fetch';
import config from '../../config';
import { brotliCompress } from 'zlib';

function start(bot: TelegramBot) {
  bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;
    fetch(`http://localhost:${config.PORT}/start`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(msg),
    })
      .then((res: Response) => {
        console.log(res.status);
        return res.json();
      })
      .then((res: IUser) => {
        console.log(res);
        bot.sendMessage(chatId, 'you was registred');
        bot.sendMessage(chatId, res.username);
      })
      .catch(err => {
        console.log(err);
        bot.sendMessage(chatId, 'Sorry, there was an error: ' + err);
      });
  });
}

export default start;

import TelegramBot = require('node-telegram-bot-api');
import { IUser } from 'app/server/models/IUser';
import fetch from 'node-fetch';
import config from '../../config';

function start(bot: TelegramBot) {
  bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;

    const  newUser: IUser  = {
      first_name: msg.from.first_name,
      id: msg.from.id,
      last_name: msg.from.last_name,
      username: msg.from.username,
      wallets: [],
    };

    fetch(`http://localhost:${config.PORT}/start`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        bot.sendMessage(chatId, 'you was registred');
      })
      .catch(err => {
        console.log(err);
        bot.sendMessage(chatId, 'Sorry, where was an error: ' + err);
      });
    // const helpString = '';
    // bot.sendMessage(chatId, helpString);
  });
}

export default start;

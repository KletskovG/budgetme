import TelegramBot = require('node-telegram-bot-api');
import { IUser } from 'app/server/models/IUser';
import fetch from 'node-fetch';
import config from '../../config';

function start(bot: TelegramBot) {
  bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;

    // TODO: Make own class for that
    const  newUser: IUser  = {
      first_name: msg.from.first_name,
      id: msg.from.id,
      last_name: msg.from.last_name,
      username: msg.from.username,
      wallet: {
        amount: 0,
        owner: msg.from.username,
        budget: {
          amount: 0,
          deadline: '',
          expenses: null,
          notify: '',
        },
        savings: {
          amount: 0,
          percent: 0,
          save: 0,
        },
      },
    };

    fetch(`http://localhost:${config.PORT}/start`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((res: Response) => {
        console.log(res.status);
        return res.json();
      })
      .then((res: Response) => {
        console.log(res);
        bot.sendMessage(chatId, 'you was registred');
      })
      .catch(err => {
        console.log(err);
        bot.sendMessage(chatId, 'Sorry, there was an error: ' + err);
      });
  });
}

export default start;

import TelegramBot = require('node-telegram-bot-api');
import IUser from 'app/models/User/IUser';
import User from '../../models/User/User';
import fetch from 'node-fetch';
import config from '../../config';
import { brotliCompress } from 'zlib';

function start(bot: TelegramBot) {
  bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;

    // TODO: Make own class for that
    // const  newUser: IUser  = {
    //   firstName: msg.from.first_name,
    //   id: msg.from.id,
    //   lastName: msg.from.last_name,
    //   username: msg.from.username,
    //   wallet: {
        // amount: 0,
        // owner: msg.from.username,
        // budget: {
        //   amount: 0,
        //   deadline: '',
        //   expenses: null,
        //   notify: '',
        // },
        // savings: {
        //   amount: 0,
        //   percent: 0,
        //   save: 0,
        // },
    //   },
    // };

    const newUser: User = new User();
    newUser.create(msg);

    console.log('Genrated user data');
    console.log(newUser.data)

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

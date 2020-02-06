// import TelegramBot = require('node-telegram-bot-api');
// import { IUser } from '../../models/User/User';
// import User from '../../models/User/User';
// import fetch from 'node-fetch';
// import config from '../../config';

// function start(bot: TelegramBot) {
//   bot.onText(/\/start/, (msg, match) => {
//     const chatId = msg.chat.id;
//     const user: Partial<IUser> = {
//       first_name: msg.from.first_name,
//       last_name: msg.from.last_name,
//       id: msg.from.id,
//       username: msg.from.username,
//       wallet: null,
//       store: null,
//     }
//     fetch(`http://localhost:${config.PORT}/start`, {
//       method: 'post',
//       headers: {
//         'Content-type': 'application/json',
//       },
//       body: JSON.stringify(user),
//     })
//       .then((res: Response) => {
//         console.log(res.status);
//         return res.json();
//       })
//       .then((res: IUser) => {
//         console.log(res);
//         bot.sendMessage(chatId, 'you was registred');
//         bot.sendMessage(chatId, res.username);
//       })
//       .catch(err => {
//         console.log(err);
//         bot.sendMessage(chatId, 'Sorry, there was an error: ' + err);
//       });
//   });
// }

// export default start;

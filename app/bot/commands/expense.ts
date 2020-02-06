// import fetch from 'node-fetch';
// import TelegramBot = require('node-telegram-bot-api');
// import { brotliDecompress } from 'zlib';
// import config from '../../config';
// import IStorage from '../../models/BotModels/IStorage';
// import User from '../../models/User/User';
// import UserModel, { IUser } from '../../models/User/User';
// import Logger from '../../server/core/Logger';
// const logger = Logger.getInstance();

// function expense(bot: TelegramBot) {
//     bot.onText(/expense/, async (msg, match) => {
//         const chatId = msg.chat.id;
//         const expenseRequirements = 'Please, send me amount of transaction in following form: 100 coffee';
//         bot.sendMessage(chatId, expenseRequirements);
//         const store: IStorage = {
//             chatId,
//             message: msg,
//             field: 'isExpenseEnabled',
//             isFieldEnabled: true,
//         };
//         updateStorage(store);
//     });

//     bot.onText(/(.+)/, async (msg, match) => {
//         const chatId = msg.chat.id;
//         const user = await UserModel.findOne({ id: msg.from.id });
//         const isExpense = msg.text.includes('expense');
//         logger.log('Processing expense command');
//         if (user.store.isExpenseEnabled && isExpense === false) {
//             bot.sendMessage(chatId, 'Processing expense command');
//             addExpense(chatId, msg);
//         } else {
          
//             logger.log(`Dont respond to not expense message ${msg.text}`);
//         }
//       });

//     function updateStorage(storeToUpdate: IStorage): void {
//         const data = {
//             id: storeToUpdate.message.from.id,
//             ...storeToUpdate,
//         };

//         fetch(`http://localhost:${config.PORT}/user/store`, {
//             method: 'post',
//             headers: {
//                 'Content-type': 'application/json',
//             },
//             body: JSON.stringify(data),
//         }).catch((err: Error) => {
//             bot.sendMessage(storeToUpdate.chatId, `${err} Telegram`);
//             logger.logError(`cant update ${storeToUpdate.field} store ${storeToUpdate.message.from.id}`, 'Telegram expense');
//         });
//     }

//     function addExpense(chatId: number, message: TelegramBot.Message): void {
//         const text = message.text.trim();
//         const isValidString = parseExpenseString(text);
//         if (isValidString) {
//             const amount = Number(text.substr(0, text.indexOf(' ')));
//             const category = text.substr(text.indexOf(' '), text.length - 1);

//             const data = {
//                 id: message.from.id,
//                 expense: amount,
//                 category,
//             };
//             fetch(`http://localhost:${config.PORT}/expense`, {
//                 method: 'post',
//                 headers: {
//                     'Content-type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//             })
//             .then((res: Response) => res.json())
//             .then((res: IUser) => {
//                 const wallet = res.wallet;
//                 const username = res.username;

//                 bot.sendMessage(chatId, `${username} \b  amount: ${wallet.amount}`);
//             })
//             .catch((err: Error) => {
//                 bot.sendMessage(chatId, `${err} Telegram`);
//                 logger.logError(`Cant add expense ${message.from.id} ${text}`, 'Telegram expense');
//             });
//         } else {
//             bot.sendMessage(chatId, 'I cant recognize expense message');
//             const store: IStorage = {
//               chatId,
//               message: null,
//               field: 'isExpenseEnabled',
//               isFieldEnabled: false,
//             };
//             updateStorage(store);
//             logger.logError(`Cant recognize expense message ${text}`, 'Telegram expense');
//         }
//     }

//     // TODO: refactor
//     function parseExpenseString(text: string): boolean {
//         const countOfWhiteSpaces = text.match(/ /g).length;
//         if (countOfWhiteSpaces === 1) {
//             const whiteIndex = text.indexOf(' ');
//             const amount = Number(text.substr(0, whiteIndex));
//             const category = text.substr(whiteIndex, text.length - 1);
//             const onlyAlphabetReg = new RegExp(/^[a-zA-Z]+$/);
//             if (amount > 0 && onlyAlphabetReg.test(category)) {
//                 return true;
//             } else { return false; }
//         } else { return false; }
//     }
// }

// export default expense;

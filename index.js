const fs = require('fs');
const path = require('path');
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'serverConfig.json'), 'utf8'));

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(config.token,{ polling: true });


bot.onText(/\/analytics/, (msg, match) => {

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  bot.sendMessage(chatId,'Hello Analytics');
});



// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;

//   bot.sendMessage(chatId, 'Received your message');
// });
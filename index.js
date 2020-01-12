const config = require('./serverConfig');
const express = require('express');
const PORT = process.env.PORT || 4200;
const app = express();
const db = require('./app/core/dbconnection');
const bodyParser = require('body-parser');

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(config.token,{ polling: true });

const registerCommands = require('./app/commands/commands');
registerCommands(bot);

app.use(bodyParser.json());

const logsRoute = require('./app/routes/logs');
logsRoute(app);

bot.onText(/\/analytics/, (msg, match) => {

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  bot.sendMessage(chatId,'Hello Analytics');
});


bot.onText(/\Поступление(.+)/, (msg, match) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Income');
});



db()
  .then(() => {
    app.listen(PORT, () => {
      console.log('Bot is up \b Server is running on ' + PORT);
    });
  })
  .catch(err => {
    console.log('An error occured while connecting to db ' + err);
  });
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;

//   bot.sendMessage(chatId, 'Received your message');
// });

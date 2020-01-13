import bodyParser from 'body-parser';
import express from 'express';
import config from './serverConfig';

import TelegramBot from 'node-telegram-bot-api';
import db from './core/dbconnection';

import registerCommand from './commands/commands';
const bot = new TelegramBot(config.token,{ polling: true });
const PORT = process.env.PORT || 4200;
const app = express();

registerCommand(bot);

app.use(bodyParser.json());

const logsRoute = require('./routes/logs');
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

const fs = require('fs');
const path = require('path');
const config = require('./serverConfig');
const express = require('express');
const PORT = process.env.PORT || 4200;
const app = express();
const bodyParser = require('body-parser');

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(config.token,{ polling: true });

const registerCommands = require('./app/commands/commands');
registerCommands(bot);

app.use(bodyParser.json());

bot.onText(/\/analytics/, (msg, match) => {

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  bot.sendMessage(chatId,'Hello Analytics');
});


bot.onText(/\Поступление(.+)/, (msg, match) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Income');
});

app.listen(PORT, () => {
  console.log('Bot is up \b Server is running on ' + PORT);
});
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;

//   bot.sendMessage(chatId, 'Received your message');
// });
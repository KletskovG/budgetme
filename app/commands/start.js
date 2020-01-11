function startCommand(bot) {
  bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;
    const user = msg.from.username;
    console.log(msg.from)

    bot.sendMessage(chatId, user);
  });
}

module.exports = startCommand;

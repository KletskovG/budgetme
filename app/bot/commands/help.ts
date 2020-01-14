function helpCommand(bot) {
  bot.onText(/\/help/, (msg, match) => {
    const chatId = msg.chat.id;

    const helpString = '';
    bot.sendMessage(chatId, helpString);
  });
}

export default helpCommand;

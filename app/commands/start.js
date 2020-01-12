const path = require('path');
const User = require(path.join(__dirname, '../models/User'));

function startCommand(bot) {
  bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;
    const user = {
      id: msg.from.id,
      first_name: msg.from.first_name,
      last_name: msg.from.last_name,
      username: msg.from.username,
      wallets: [],
    };

    const isUnique = isUniqueUser(user);

    // User.create(user, (err) => {
    //   if (err) {
    //     bot.sendMessage(chatId, 'Error while registering user '+ err);
    //   } else {
    //     bot.sendMessage(chatId, 'You was registred '+ user.username);
    //   }
    // });
  });
}

// TODO: Handle error here
async function isUniqueUser(user) {
  const _user = await User.findOne(user, (err, usr) => {
    if (err) {
      console.log(err);
      return null;
    } else {
      return usr
    }
  });

  console.log(_user);

  return _user;
}

module.exports = startCommand;

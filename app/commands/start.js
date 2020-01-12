const path = require('path');
const User = require(path.join(__dirname, '../models/User'));
const Logger = require(path.join(__dirname, '../core/logger'));
const _logger = new Logger('main.log');

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
    if (isUnique) {
      User.create(user, err => {
        if (err) {
          bot.sendMessage(chatId, 'Error while registering user ' + err);
          console.log(err);
        } else {
          bot.sendMessage(chatId, 'You was registred ' + user.username);
          _logger.log(`New user was registered ${user.username} \b`);
        }
      });
    } else {
      bot.sendMessage(chatId, 'You are already registered ' + user.username);
    }
  });
}

// TODO: Handle error here
async function isUniqueUser(user) {
  const _user = await User.findOne({id: user.id}, (err, usr) => {
    if (err) {
      console.log(err);
      _logger.log(`An error ocurred while finding user ${err} \b`);
      return null;
    } else {
      return usr;
    }
  });

  if (!!_user) {
    _logger.log(`User was find ${_user} \b`)
    return false;
  }
  _logger.log(`User wasnt found`);
  return true;
}

module.exports = startCommand;

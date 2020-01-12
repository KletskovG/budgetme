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

    // 
    
    const register = registerUser(user);
    bot.sendMessage(chatId, register);
  });
}

async function registerUser(user) {
  const result = await User.findOne({ id: user.id }, (err, usr) => {
    if (err) {
      _logger.log(`An error occured while finding user ${user.username} \b ${err}`);
      return 'An error occured while finding user';
    }

    if (!!usr) {
      return 'You are already registered';
    } else {
       const answer = await User.create(user, err => {
         if (err) {
           _logger.log(`An error occured while creating user ${user.username} \b ${err}`);
           return 'An error occured while creating user';
         } else {
          //  bot.sendMessage(chatId, 'You was registred ' + user.username);
           _logger.log(`New user was registered ${user.username} \b`);
           return 'New user was registered';
         }
       });

       return answer;
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

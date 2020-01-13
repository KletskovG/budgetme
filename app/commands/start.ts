import path from 'path';
import Logger from '../core/logger';
import User from '../models/User';
const logger = new Logger('main.log');

function startCommand(bot) {

  bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;
    const user = {
      first_name: msg.from.first_name,
      id: msg.from.id,
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
      logger.log(`An error occured while finding user ${user.username} \b ${err}`);
      return 'An error occured while finding user';
    }

    if (!!usr) {
      return 'You are already registered';
    } else {
       User.create(user)
       .then(user => {
         return user;
       })
       .catch(err => {
         return err;
       });

    }
  });
}

// TODO: Handle error here
async function isUniqueUser(user) {
  const _user = await User.findOne({id: user.id}, (err, usr) => {
    if (err) {
      console.log(err);
      logger.log(`An error ocurred while finding user ${err} \b`);
      return null;
    } else {
      return usr;
    }
  });

  if (!!_user) {
    logger.log(`User was find ${_user} \b`);
    return false;
  }
  logger.log(`User wasnt found`);
  return true;
}

export default startCommand;

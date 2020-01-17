import { Message } from 'node-telegram-bot-api';
import IUser from './IUser';
import IWallet from '../Wallet/IWallet';
import TelegramBot = require('node-telegram-bot-api');
import UserModel from './UserModel';

class User implements IUser {
  public id: number = null;
  public first_name: string = '';
  public last_name: string = '';
  public wallet: IWallet = null;
  public username: string = '';
  public store = null;

  constructor() {}

  public create(user: IUser): void {
    this.id = user.id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.username = user.username;
    this.wallet = {
      amount: 0,
      owner: user.username,
      budget: {
        amount: 0,
        deadline: '',
        expenses: null,
        notify: '',
      },
      savings: {
        amount: 0, 
        percent: 0,
        save: 0,
      },
    };
    this.store = {
      isIncomeEnabled: false,
    };
  }

  public get data() {
    return {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      username: this.username,
      wallet: this.wallet,
      store: this.store,
    }
  }

  public findFromDB(message: TelegramBot.Message): Promise<any> {
    return new Promise((resolve, reject) => {
      UserModel.findOne({ id: message.from.id, username: message.from.username })
        .then((findedUser) => {
          resolve(findedUser);
        })
        .catch((err: Error) => reject(err));
    });
  }

  public update(user: IUser, update: object): Promise<any> {
    return new Promise((resolve, reject) => {
      UserModel.findOneAndUpdate({ id: user.id }, { update })
      .then((updatedUser) => {
        console.log('USER WAS UPDATED');
        console.log(updatedUser);
        resolve(updatedUser);
      })
      .catch((err: Error) => reject(err));
    });
  }
}

export default User;

import { Message } from 'node-telegram-bot-api';
import IUser from './IUser';
import IWallet from '../Wallet/IWallet';

class User implements IUser {
  public id: number = null;
  public firstName: string = '';
  public lastName: string = '';
  public wallet: IWallet = null;
  public username: string = '';
  public store = null;

  constructor() {}

  public create(message: Message): void {
    this.id = message.from.id;
    this.firstName = message.from.first_name;
    this.lastName = message.from.last_name;
    this.username = message.from.username;
    this.wallet = {
      amount: 0,
      owner: message.from.username,
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

}

export default User;

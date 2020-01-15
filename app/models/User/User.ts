import { Message } from 'node-telegram-bot-api';
import IUser from './IUser';
import IWallet from '../Wallet/IWallet';

class User implements IUser {
  public id: number = null;
  public first_name: string = '';
  public last_name: string = '';
  public wallet: IWallet = null;
  public username: string = '';
  public store = null;

  constructor() {}

  public create(message: Message): void {
    this.id = message.from.id;
    this.first_name = message.from.first_name;
    this.last_name = message.from.last_name;
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
}

export default User;

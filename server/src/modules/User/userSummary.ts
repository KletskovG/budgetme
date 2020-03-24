import {Express} from 'express';
import Logger from '../../core/Logger';
import { User, IUser } from '../../../models/User/User';
import Wallet, { IWallet } from '../../../models/Wallet/Wallet';
import IIncome from '../../../models/Wallet/IIncome';
import IExpense from '../../../models/Wallet/IExpense';
import ISummary from '../../../models/User/ISummary';

class userSummary {
  private app: Express = null;
  private logger: Logger = new Logger();
  
  constructor(app: Express) {
    this.app = app;
    this.getUserSummary();
  }

  private getUserSummary() {
    this.app.get('/user/:id/summary', async (req, res) => {
      const user = await User.findById(req.params.id);
      let wallets: IWallet[];
      if (!!user) {
        wallets = await Wallet.find({ owner: user.email });
        const summary: ISummary = this.countSummary(wallets);
        res.status(200).send(JSON.stringify(summary));
      } else {
        res.statusMessage = 'Cant find this user';
        res.status(500).send();
        this.logger.log(`Cant find user   ID:  ${req.params.id}`, 'error');
      }
    });
  }

  private countSummary(wallets: IWallet[]): ISummary {
    const currentMonth = new Date().getMonth() + 1;

    let balanse = 0;
    const walletsLength = wallets.length;
    for (let i = 0; i < walletsLength; i++) {
      balanse += wallets[i].amount;
    }

    const userIncomes: IIncome[] = [];
    const userExpenses: IExpense[] = [];

    wallets.forEach(wallet => {
      wallet.incomes.filter(income => {
        const monthOfTheIncome = Number.parseInt(income.timestamp.substr(5, 7), 10);
        return monthOfTheIncome === currentMonth;
      }).forEach(income => userIncomes.push(income));

      wallet.expenses.filter(expense => {
        const monthOfTheExpense = Number.parseInt(expense.timestamp.substr(5,7), 10);
        return monthOfTheExpense === currentMonth;
      }).forEach(expense => userExpenses.push(
        { count: expense.count, category: expense.category, timestamp: expense.timestamp }
      ));
    })

    const expenses: number = userExpenses.reduce((prev, curr) => prev + curr.count, 0);
    const incomes: number = userIncomes.reduce((prev, curr) => prev + curr.count, 0);
    return {
      balanse,
      expenses,
      incomes,
    }
  }
}

export default userSummary;

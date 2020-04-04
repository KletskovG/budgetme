import {Express} from 'express';
import {User, IUser} from '../../../models/User/User';
import Logger from '../../core/Logger';
import Wallet, { IWallet } from '../../../models/Wallet/Wallet';
import IUserInfo from '../../../models/User/IUserInfo';
import { reverse } from 'dns';

// TODO: start counting subscriptions and trach next payment
class UserInfo {
  private app: Express = null;
  private logger: Logger = new Logger();
  
  constructor(app: Express) {
    this.app = app;
  }

  public getUserInfo(): void {
    this.app.get('/user/:id/info', async (req, res) => {
      const id = req.params.id;
      const user = await User.findById(id);

      if (!!user) {
        // TODO: replace it with findByid
        const userWallets: IWallet[] = await Wallet.find({owner: user.email});
        const userBalanse: number = userWallets.reduce((prev, curr) => {
          return prev + curr.amount;
        }, 0);

        const data: IUserInfo = {
          balanse: userBalanse,
        }

        res.status(200).send(JSON.stringify(data));
        this.logger.log(`Send user info to ${id} (User info)`, 'info');
      } else {
        res.status(500).send('Cant find this user');
        this.logger.log(`Cant find user (User info) ${id}`, 'error');
      }
    });
  }

  // private async getUserExpenses(wallets: IWallet[]): number {
  //   const currentDate = new Date(new Date().toISOString()).getTime();
  //   const expenses = wallets.reduce((prev, wallet) => {
  //     const walletLastExpenses = wallet.expenses.filter(expense => {
  //       const expenseDate = new Date(expense.createdAt).getTime();
  //       if (currentDate - expenseDate < 86400000 * 30) {
  //         return true;
  //       } else return false;
  //     });

  //     return walletLastExpenses.reduce((prev, curr) => prev + curr.count)
  //   })
  // }
}

export default UserInfo;
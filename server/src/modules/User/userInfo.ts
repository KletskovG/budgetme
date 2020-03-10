import {Express} from 'express';
import {User} from '../../../models/User/User';
import Logger from '../../core/Logger';
import Wallet, { IWallet } from '../../../models/Wallet/Wallet';
import IUserInfo from '../../../models/User/IUserInfo';

// TODO: start counting subscriptions and trach next payment
class UserInfo {
  private app: Express = null;
  private logger: Logger = new Logger();
  
  constructor(app: Express) {
    this.app = app;
  }

  getUserInfo() {
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
}

export default UserInfo;
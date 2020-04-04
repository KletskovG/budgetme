import { Express } from 'express';
import { User } from '../../../models/User/User';
import Wallet, { IWallet, IWalletBase } from '../../../models/Wallet/Wallet';
import Logger from '../../core/Logger';

// TODO: add validation of req parameters and search for exsisting wallet

class CreateWallet {
  private app: Express = null;
  private logger: Logger = null;
  constructor(app: Express) {
    this.app = app;
    this.logger = new Logger();
    this.createWallet();
  }
  private createWallet(): void {
    this.app.post('/wallet',  async  (req, res) => {
      const user = await User.findOne({email: req.body.email});
      if (!!user) {
        const wallet: IWalletBase = {
          amount: 0,
          owner: req.body.email,
          expenses: [],
          incomes: [],
          name: req.body.name,
        }

        Wallet.create(wallet)
        .then(createdWallet => res.status(200).send(JSON.stringify(createdWallet)))
        .catch((err: Error) => {
          res.statusMessage = err.message;
          res.status(500).send();
          this.logger.log(`Cant create wallet ${req.body}`, 'error');
        })
      } else {
        res.statusMessage = 'Cant find this user';
        res.status(404).send();
        this.logger.log(`Cant find user email ::: ${req.body.email} (/wallet create)`, 'error');
      }
    })
  }
}

export default CreateWallet;

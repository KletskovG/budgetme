import { Express } from 'express';
import Logger from '../../core/Logger';
import Wallet from '../../../models/Wallet/Wallet';

class UserWallet  {
  private app: Express = null;
  private logger: Logger = new Logger();
  constructor(app: Express) {
    this.app = app;

    this.getWallet();
    this.getWallets();
  }

  private getWallet() {
    this.app.get('/user/:email/wallet/:id', async (req, res) => {
      const email = req.params.email;
      const id = req.params.id;
      const wallet = await Wallet.findById(id);
      if (!!wallet) {
        res.status(200).send(JSON.stringify(wallet));
        this.logger.log(`${email} get wallet  --- ${id}`, 'info');
      } else {
        res.status(500).send('Cant find wallet');
        this.logger.log(`Cant find wallet -- ${id} for ${email}`, 'error');
      }
    });
  }

  private getWallets() {
    this.app.get('/user/:email/wallets', async (req, res) => {
      const email = req.params.email;
      const walletName = req.params.name;
      const wallets = await Wallet.find({ owner: email });
      if (!!wallets) {
        res.status(200).send(JSON.stringify(wallets));
        this.logger.log(`Send wallets list to ${email}`, 'info');
      } else {
        res.status(500).send('Cant find this wallet');
        this.logger.log(`Cant find wallet ${walletName} of ${email}`, 'error');
      }
    });
  }
}

export default UserWallet;

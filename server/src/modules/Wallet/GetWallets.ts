import {Express} from 'express';
import Wallet from '../../../models/Wallet/Wallet';
import Logger from '../../core/Logger';

class GetWallets {
  private app: Express = null;
  private logger: Logger = new Logger();
  constructor(app: Express) {
    this.app = app;
    this.getWallets();
    this.getWallet();
  }

  private getWallets() {
    this.app.get('/wallet/:email', async (req, res) => {
      const email = req.params.email;
      const wallets = await Wallet.find({owner: email});
      if (!!wallets) {
        res.status(200).send(JSON.stringify(wallets));
        this.logger.log(`${email} get wallets`, 'info');
      } else {
        res.status(500).send('Cant find wallets');
        this.logger.log(`Cant find wallets for ${email}`, 'error');
      }
    });
  }

  private getWallet() {
    this.app.get('/wallet/:email/:name', async (req, res) => {
      const email = req.params.email;
      const walletName = req.params.name;
      const wallet = await Wallet.findOne({owner: email, name: walletName});
      if (!!wallet) {
        res.status(200).send(JSON.stringify(wallet));
        this.logger.log(`Send wallet ${walletName} to ${email}`, 'info');
      } else {
        res.status(500).send('Cant find this wallet');
        this.logger.log(`Cant find wallet ${walletName} of ${email}`, 'error');
      }
    });
  }
}

export default GetWallets;

import { Express } from 'express';
import IIncome from '../../../models/Wallet/IIncome';
import Wallet, { IWallet } from '../../../models/Wallet/Wallet';
import Logger from '../../core/Logger';

// TODO: add validation

class Income {
  private app: Express = null;
  private logger: Logger = null;
  constructor(app: Express) {
    this.app = app;
    this.income();
    this.logger = new Logger();
  }

  private income() {
    this.app.post('/wallet/income', (req, res) => {
      const {
        email,
        name,
        count,
        category,
       } = req.body;
      const timestamp = new Date().toISOString();

      Wallet.findOne({ owner: email, name })
        .then((findedWallet: IWallet) => {
          if (!!findedWallet) {
            findedWallet.incomes.push({ count, category, timestamp });
            findedWallet.amount += count;
            findedWallet.save();
            res.status(200).send('Income was added to your wallet');
            this.logger.log(`Add income to ${email} -- Wallet: ${name} -- ${count}`, 'info');
          } else {
            res.status(500).send('Cant find wallet');
            this.logger.log('Cant find wallet (add income)', 'error');
          }
        })
        .catch((err: Error) => {
          console.log(err);
          this.logger.log('Cant find wallet in income', 'error');
          res.status(500).send(`${err}`);
        });
    });
  }
}

export default Income;

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
    this.app.post('/wallet/income', async (req, res) => {
      const id = req.body.id;
      const incomeData: IIncome = {
        count: req.body.count,
        category: req.body.category,
        timestamp: new Date().toISOString(),
      }

      const wallet = await Wallet.findById(id);
      if (!!wallet) {
        wallet.incomes.push(incomeData);
        wallet.amount += incomeData.count;
        wallet.save();
        res.status(200).send(JSON.stringify(wallet));
        this.logger.log(`Add income to -- Wallet: ${id} -- ${incomeData.count}`, 'info');
      } else {
        res.status(500).send('Cant find wallet');
        this.logger.log('Cant find wallet (add income)', 'error');
      }
      // Wallet.findOne({ owner: email, name })
      //   .then((findedWallet: IWallet) => {
      //     if (!!findedWallet) {
      //       findedWallet.incomes.push({ count, category, timestamp });
      //       findedWallet.amount += count;
      //       findedWallet.save();
      //       res.status(200).send(JSON.stringify(findedWallet));
            // this.logger.log(`Add income to ${email} -- Wallet: ${name} -- ${count}`, 'info');
      //     } else {
            // res.status(500).send('Cant find wallet');
            // this.logger.log('Cant find wallet (add income)', 'error');
      //     }
      //   })
      //   .catch((err: Error) => {
      //     console.log(err);
      //     this.logger.log('Cant find wallet in income', 'error');
      //     res.status(500).send(`${err}`);
      //   });
    });
  }
}

export default Income;

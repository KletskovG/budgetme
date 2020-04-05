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
    this.app.post('/wallet', async (req, res) => {
      const email = req.body.email;
      // User.findOne({ email })
      //   .then((findedUser) => {
      //     if (!!findedUser) {
            // const wallet: IWalletBase = {
            //   amount: 0,
            //   owner: email,
            //   expenses: [],
            //   incomes: [],
            //   name: req.body.name,
            // };

      //       Wallet.create({...wallet})
      //         .then((createdWallet) => res.status(200).send(JSON.stringify(createdWallet)))
      //         .catch((err: Error) => {
      //           res.status(500).send(err);
      //           this.logger.log('Cant create wallet (Create wallet)', 'error');
      //         });
      //     } else {
      //       res.status(500).send('Cant find user');
      //       this.logger.log('Cant find user (Create wallet)', 'error');
      //     }
      //   })
      //   .catch((err: Error) => res.status(500).send(err));

      const user = await User.findOne({email});
      try {
        if (!!user) {
          const wallet: IWalletBase = {
            amount: 0,
            owner: email,
            expenses: [],
            incomes: [],
            name: req.body.name,
          };

          Wallet.create(wallet)
          .then((createdWallet) => {
            res.status(200).send(JSON.stringify(createdWallet));
            this.logger.log(`Create wallet for ${email}`, 'info');
          })
          .catch((err: Error) => {
            throw new Error(err.message);
          })
        } else {
          res.statusMessage = 'Cant find user';
          res.status(404).send();
          this.logger.log(`(Create wallet) cand find user email ${email}`, 'error');
        }
      } catch (error) {
        res.statusMessage = 'Unknown server error';
        res.status(500).send();
        this.logger.log('Unknown server error (Create wallet)', 'error');
      }
    })
  }
}

export default CreateWallet;

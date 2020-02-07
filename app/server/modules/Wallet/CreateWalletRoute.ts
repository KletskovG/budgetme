import { Express } from 'express';
import { User } from '../../../models/User/User';
import Wallet, { IWallet, IWalletBase } from '../../../models/Wallet/Wallet';

// TODO: add validation of req parameters and search for exsisting wallet

class CreateWallet {
  private app: Express = null;
  constructor(app: Express) {
    this.app = app;
    this.createWallet();
  }

  private createWallet(): void {
    this.app.post('/wallet/create', (req, res) => {
      const email = req.body.email;
      User.findOne({ email })
        .then((findedUser) => {
          if (!!findedUser) {
            const wallet: IWalletBase = {
              amount: 0,
              owner: email,
              expenses: [],
              incomes: [],
              name: req.body.name,
            };

            Wallet.create({...wallet})
              .then((createdWallet) => res.status(200).send('Wallet was created'))
              .catch((err: Error) => res.status(500).send(err));
          } else {
            res.status(500).send('Cant find user');
          }
        })
        .catch((err: Error) => res.status(500).send(err));
    })
  }
}

export default CreateWallet;

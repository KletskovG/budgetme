import { Express } from 'express';
import Wallet from '../../../models/Wallet/Wallet';

// TODO: add req validation

class DeleteWallet {
  private app: Express = null;
  constructor(app: Express) {
    this.app = app;
    this.deleteWallet();
  }

  private deleteWallet() {
    this.app.post('/wallet/delete', (req, res) => {
      const email = req.body.email;
      const name = req.body.name;

      Wallet.findOne({ owner: email, name })
        .then((findedWallet) => {
          if (!!findedWallet) {
            Wallet.deleteOne({ owner: email, name })
              .then(deletedWallet => {
                res.status(200).send(`Wallet ${name} was deleted`);
              })
              .catch((err: Error) => res.status(500).send(err));
          } else {
            res.status(500).send('Cant find this wallet');
          }
        })
        .catch((err: Error) => res.status(500).send(err));
      
    })
  }
}

export default DeleteWallet;

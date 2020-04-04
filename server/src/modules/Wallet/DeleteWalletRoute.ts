import { Express } from 'express';
import Wallet, { IWallet } from '../../../models/Wallet/Wallet';

// TODO: add req validation

class DeleteWallet {
  private app: Express = null;
  constructor(app: Express) {
    this.app = app;
    this.deleteWallet();
  }

  private deleteWallet() {
    this.app.delete('/wallet', async (req, res) => {
      const email = req.body.email;
      const id = req.body.id;

      Wallet.findOneAndDelete({ owner: email, _id: id })
        .then((deletedWallet: IWallet) => res.status(200).send(JSON.stringify(deletedWallet)))
        .catch((err: Error) => res.status(500).send(err))
    });
  }
}

export default DeleteWallet;

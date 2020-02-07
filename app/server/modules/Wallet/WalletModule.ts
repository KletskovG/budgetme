import { Express } from 'express';
import CreateWalletRoute from './CreateWalletRoute';
import DeleteWalletRoute from './DeleteWalletRoute';
class Wallet {
  constructor(app: Express) {
    const create = new CreateWalletRoute(app);
    const deleteRoute = new DeleteWalletRoute(app);
  }
}

export default Wallet;

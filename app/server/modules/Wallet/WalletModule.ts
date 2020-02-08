import { Express } from 'express';
import CreateWalletRoute from './CreateWalletRoute';
import DeleteWalletRoute from './DeleteWalletRoute';
import Income from './Income';

class Wallet {
  constructor(app: Express) {
    const create = new CreateWalletRoute(app);
    const deleteRoute = new DeleteWalletRoute(app);
    const income = new Income(app);
  }
}

export default Wallet;

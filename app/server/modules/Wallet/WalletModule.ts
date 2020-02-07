import { Express } from 'express';
import CreateWalletRoute from './CreateWalletRoute';
class Wallet {
  constructor(app: Express) {
    const create = new CreateWalletRoute(app);
  }
}

export default Wallet;

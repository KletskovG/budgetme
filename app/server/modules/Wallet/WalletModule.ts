import { Express } from 'express';
import CreateWalletRoute from './CreateWalletRoute';
import DeleteWalletRoute from './DeleteWalletRoute';
import Income from './Income';
import Expense from './Expense';

class Wallet {
  constructor(app: Express) {
    const create = new CreateWalletRoute(app);
    const deleteRoute = new DeleteWalletRoute(app);
    const income = new Income(app);
    const expense = new Expense(app);
  }
}

export default Wallet;

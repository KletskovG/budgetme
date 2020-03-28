import { Express } from 'express';
import CreateWalletRoute from './CreateWalletRoute';
import DeleteWalletRoute from './DeleteWalletRoute';
import Income from './Income';
import Expense from './Expense';

export class WalletModule {
  constructor(app: Express) {
    const create: CreateWalletRoute = new CreateWalletRoute(app);
    const deleteRoute: DeleteWalletRoute = new DeleteWalletRoute(app);
    const income: Income = new Income(app);
    const expense: Expense = new Expense(app);
  }
}


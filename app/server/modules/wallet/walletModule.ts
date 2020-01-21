import income from './routes/income';
import expense from './routes/expense';
import { Express } from 'express';
class WalletModule {
  constructor(app: Express) {
    income(app);
    expense(app);
  }
}

export default WalletModule;

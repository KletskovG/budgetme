import {Express} from 'express';
import BudgetContoller from './BudgetController';

class BudgetModule {
  private app: Express = null;
  
  constructor(app: Express) {
    this.app = app;
    const budgetController: BudgetContoller = new BudgetContoller(this.app);
  }
}

export default BudgetModule;

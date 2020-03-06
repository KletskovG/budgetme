import {Express} from 'express';
import { IPeriodExpenseBase } from 'models/PeriodExpense/PeriodExpense';

class PeriodExpenses {
  private app: Express = null;
  constructor(app: Express) {
    this.app = app;
  }

  private addPeriodExpense() {
    this.app.post('/period/', async (req, res) => {
      const periodExpense: IPeriodExpenseBase = {
        name: `${req.body.name}`,
        owner: `${req.body.email}`,
        wallet: `${req.body.wallet}`,
        expense: Number(req.body.expense),
        dateStarted: `${req.body.getStarted}`,
        period: `${req.body.period}`,
      };


    });
  }

  private deletePeriodExpense() {

  }

  private updatePeriodExpense() {

  }

  private isValidPeriodData(data: IPeriodExpenseBase): boolean {
    let result = true;
    return result;
  }
}

export default PeriodExpenses;

import { Express } from 'express';
import IExpense from '../../../models/Wallet/IExpense';
import Logger from '../../core/Logger';
import ValidEmail from '../../core/Validation/Email';
import Wallet from '../../../models/Wallet/Wallet';

class Expense {
  private app: Express = null;
  private logger: Logger = null;
  constructor(app: Express) {
    this.app = app;
    this.logger = new Logger();
    this.expense();
  }

  private expense(): void {
    this.app.post('/wallet/expense', async (req, res) => {
      const expenseData: IExpense = {
        email: req.body.email,
        name: req.body.name,
        count: req.body.count,
        category: req.body.category,
        timestamp: new Date().toISOString(),
      };
      console.log(expenseData);
      const wallet = await Wallet.findOne({ owner: expenseData.email, name: expenseData.name });
      if (this.isValidData(expenseData) && !!wallet) {
        wallet.expenses.push({
          count: expenseData.count,
          category: expenseData.category,
          timestamp: expenseData.timestamp,
        });
        wallet.amount -= expenseData.count;
        wallet.save();
        res.status(200).send('OK');
        this.logger.log(`Add expense to ${expenseData.email} -- Wallet: ${expenseData.name} -- ${expenseData.count}`, 'info');
      } else {
        res.status(500).send('Your data was invalid or unable to find this wallet');
        this.logger.log('Invalid data in /expense \n ' + expenseData + '\n or cant find wallet' , 'error');
      }
    });
  }

  private isValidData(expense: IExpense): boolean {
    const validEmail = new ValidEmail(expense.email).isValid;
    const isValidName = expense.name.trim().length > 0;
    const positiveCount = Number(expense.count) > 0;
    const notEmptyCategory = expense.category.trim().length > 0;
    const rules = [validEmail, isValidName, positiveCount, notEmptyCategory];

    let result = true;
    rules.forEach((rule: boolean) => {
      if (rule === false) {
        result = false;
      }
    });
    return result;
  }
}

export default Expense;

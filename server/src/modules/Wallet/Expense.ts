import { Express } from 'express';
import IExpense from '../../../models/Wallet/IExpense';
import Logger from '../../core/Logger';
import ValidEmail from '../../core/Validation/Email';
import BudgetService from '../Budget/BudgetService';
import ITransaction from '../../../interfaces/ITransaction';
import { Budget } from '../../../models/Budget/Budget';
import Wallet, { IWallet, IWalletBase } from '../../../models/Wallet/Wallet';

class Expense {
  private app: Express = null;
  private logger: Logger = null;
  private budgetService: BudgetService = new BudgetService();
  constructor(app: Express) {
    this.app = app;
    this.logger = new Logger();
    this.expense();
  }

  private expense(): void {
    this.app.post('/wallet/expense', async (req, res) => {
      const id = req.body.id;
      const expenseData: IExpense = {
        count: req.body.count,
        category: req.body.category,
        timestamp: req.body.timestamp,
      };
      const wallet = await Wallet.findById(id);
      if (this.isValidData(expenseData) && !!wallet) {
        wallet.expenses.push({
          count: expenseData.count,
          category: expenseData.category,
          timestamp: expenseData.timestamp,
        });
        wallet.amount -= expenseData.count;
        wallet.save();
        res.status(200).send(JSON.stringify(wallet));
        this.logger.log(`Add expense to ${id} -- Wallet:  -- ${expenseData.count}`, 'info');
        this.handleBudget(wallet, expenseData);
      } else {
        res.status(500).send('Your data was invalid or unable to find this wallet');
        this.logger.log('Invalid data in /expense \n ' + expenseData + '\n or cant find wallet' , 'error');
      }
    });
  }

  private isValidData(expense: IExpense): boolean {
    const positiveCount = Number(expense.count) > 0;
    const notEmptyCategory = expense.category.trim().length > 0;
    const rules = [positiveCount, notEmptyCategory];

    let result = true;
    rules.forEach((rule: boolean) => {
      if (rule === false) {
        result = false;
      }
    });
    return result;
  }

  // TODO: Test it
  private async handleBudget(wallet: IWallet, expense: IExpense) {
    const transaction: ITransaction = {
      category: expense.category,
      count: expense.count,
      timestamp: expense.timestamp,
    };

    const budget = await Budget.findOne({ walletId: wallet.id, owner: wallet.owner });

    if (!!budget) {
      this.budgetService.addTransactionToBudget(budget.id, transaction);
    } else {

    }
  }
}

export default Expense;

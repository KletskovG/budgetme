import {Express} from 'express';
import { IBudgetBase, Budget, IBudget } from '../../../models/Budget/Budget';
import ValidBudget from '../../core/Validation/ValidBudget';
import Logger from '../../core/Logger';
import BudgetService from './BudgetService';

class BudgetController {
  private app: Express = null;
  private logger: Logger = new Logger();
  private validBudget: ValidBudget = new ValidBudget();
  private budgetService: BudgetService = new BudgetService();
  constructor(app: Express) {
    this.app = app;

    this.createBudget();
    this.deleteBudget();
    this.updateBudget();
    this.renewBudget();
  }

  // TODO: Test it
  private createBudget(): void {
    this.app.post('/budget', async (req, res) => {
      const budget: IBudgetBase = {
        ownerId: req.body.ownerId,
        owner: req.body.owner,
        walletId: req.body.walletId,
        estimate: req.body.estimate,
        amount: req.body.estimate,
        isMonthly: req.body.isMonthly,
        currency: req.body.currency,
        expenses: [],
      }

      this.budgetService.createBudget(budget)
        .then(createdBudget => {
          res.status(200).send(JSON.stringify(createdBudget));
        })
        .catch(err => {
          res.status(500).send('Server error');
          console.log(err);
        });
    });
  }

  // TODO: Test it
  private deleteBudget(): void {
    this.app.delete('/budget', async (req, res) => {
      
      this.budgetService.deleteBudget(req.body.id)
        .then(id => {
          res.status(200).send(`${id}`);
        })
        .catch(err => {
          res.status(500).send('Cant find this budget');
        });
    });
  }

  // TODO: Test it
  private updateBudget(): void {
    this.app.put('/budget', async (req, res) => {
      const budgetId = req.body.id;
      const updatedData: IBudgetBase = {
        ownerId: req.body.ownerId,
        owner: req.body.email,
        walletId: req.body.walletId,
        estimate: req.body.estimate,
        amount: req.body.estimate,
        isMonthly: req.body.isMonthly,
        expenses: [],
        currency: req.body.currency,
      }
      this.budgetService.updateBudget(budgetId, updatedData)
        .then((updatedBudget: IBudget) => {
          res.status(200).send(JSON.stringify(updatedBudget));
        })
        .catch(err => {
          res.status(500).send(`Cant find budget ${budgetId} for ${req.body.email}`);
        })
    });
  }

  public addTransactionToBudget(): void {

  }

  public renewBudget(): void {
    this.app.get('/budget/:id', async (req, res) => {
      const id = req.params.id;
      // this.budgetService.renewBudget()
    })
  }
}

export default BudgetController;

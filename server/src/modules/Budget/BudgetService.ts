import { IBudgetBase, Budget, IBudget } from '../../../models/Budget/Budget';
import ValidBudget from '../../core/Validation/ValidBudget';
import ITransaction from '../../../interfaces/ITransaction';
import Logger from '../../core/Logger';

class BudgetService {
  private validBudget: ValidBudget = new ValidBudget();
  private logger: Logger = new Logger();

  public async createBudget(budget: IBudgetBase): Promise<IBudget> {
    
    const otherBudget = await Budget.findOne({
      ownerId: budget.ownerId,
      walletId: budget.walletId,
      isMonthly: budget.isMonthly,
    });
    const isValidData = await this.validBudget.isValidBudget(budget);

    return new Promise<IBudget>((resolve, reject) => {
      if (isValidData === false || !!otherBudget) {
        reject('Data is invalid or budget is already created');
        this.logger.log(`Cant create budget (/budget createBudget) ${JSON.stringify(budget)} --- Data is invalid or budget is already created`, 'error');
      } else {
        Budget.create(budget)
          .then(createdBudget => {
            resolve(createdBudget);
            this.logger.log(`Create new budget -- ${JSON.stringify(createdBudget)}`, 'info');
          })
          .catch(err => {
            reject(err);
            this.logger.log(`Cant create budget (/budget createBudget) ${JSON.stringify(budget)} --- ${err}`, 'error');
          })
      }
    });
  }

  public async deleteBudget(id: string): Promise<string> {
    const budget = await Budget.findById(id);

    return new Promise<string>((resolve, reject) => {
      if (!!budget) {
        Budget.findByIdAndDelete(id);
        resolve(id);
        this.logger.log(`Delete budget ${id} for ${budget.owner}`, 'info');
      } else {
        reject('Cant find this budget');
        this.logger.log(`Cant find budget ${id} for ${budget.owner} --- Cant find this budget`, 'error');
      }
    })
  }

  public async updateBudget(id: string, updatedData: IBudgetBase): Promise<IBudget> {
    const budget = await  Budget.findById(id);

    return new Promise<IBudget>((resolve, reject) => {
      if (!!budget) {
        budget.estimate = updatedData.estimate;
        budget.isMonthly = updatedData.isMonthly;
        budget.currency = updatedData.currency;
        budget.save();

        resolve(budget);
        this.logger.log(`Budget ${id} was updated`, 'info');
      } else {
        reject('Cant find this wallet');
        this.logger.log(`Cant find budget ${id} for ${budget.owner} (Update budget /budget)`, 'error');
      }
    });
  }

  public async renewBudget(id: string): Promise<IBudget> {
    const budget = await Budget.findById(id);

    return new Promise<IBudget>((resolve, reject) => {
      if (!!budget) {
        budget.amount = budget.estimate;
        budget.expenses = [];
        budget.save();
        resolve(budget);
        this.logger.log(`Renew budget (renewBudget) ${id} --- ${JSON.stringify(budget)}`, 'info');
      } else {
        reject('Cant find this budget');
        this.logger.log(`Cant find budget (renewBudget) ${id}`, 'error');
      }
    });
  }

  public async addTransactionToBudget(id: string, transaction: ITransaction) {
    const budget = await Budget.findById(id);
    const isPositiveTransaction = Number(transaction.count) > 0;
    return new Promise((resolve, reject) => {
      if (!!budget && isPositiveTransaction) {
        budget.expenses.push(transaction);
        budget.amount -= transaction.count;
        budget.save();
        resolve(budget);
        this.logger.log(`Add transaction --- ${JSON.stringify(transaction)}  --- to budget ${id}`, 'info');
      } else {
        reject('Cant find this budget');
        this.logger.log(`Cant find budget (addTransaction to budget) ${id} or transaction is not positive ---  ${JSON.stringify(transaction)}`, 'error');
      }
    });
  }
}

export default BudgetService;

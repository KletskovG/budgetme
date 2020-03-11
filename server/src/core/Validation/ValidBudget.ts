import { IBudgetBase } from '../../../models/Budget/Budget';
import Wallet from '../../../models/Wallet/Wallet';
import IValidData from './IValidData';

class ValidBudget {
  
  private isValid: boolean = null;
  constructor() {
    // this.isValid = this.isValidBudget(budget);
  }

  public async isValidBudget(budget: IBudgetBase): Promise<boolean> {
    let result = true;
    const wallet = await Wallet.findById(budget.walletId);
    const isWalletExsists = wallet === undefined || wallet === null;
    const isEstimatePositive = Number(budget.estimate) > 0;
    const isCurrencyCorrect = budget.currency === 'RUB' || budget.currency === 'USD' || budget.currency === 'EUR';
    const rules = [isWalletExsists, isEstimatePositive, isCurrencyCorrect];

    rules.forEach(rule => {
      if (rule === false) {
        result = false;
      }
    });

    return new Promise<boolean>((resolve, reject) => resolve(result));
  }
}

export default ValidBudget;

import PeriodExpense, { IPeriodExpenseBase } from '../../../models/PeriodExpense/PeriodExpense';
import ValidEmail from './Email';
import { User } from '../../../models/User/User';
import Logger from '../Logger';
import Wallet from '../../../models/Wallet/Wallet';
import IValidData from './IValidData';

class ValidPeriodExpense {
  private periodExpense: IPeriodExpenseBase = null;
  private logger: Logger = new Logger();
  
  constructor(data: IPeriodExpenseBase) {
    this.periodExpense = data;
    this.isValid = this.validatePeriodData();
  }

  private validatePeriodData(): IValidData {
    const result: IValidData = {
      isValid: true,
      message: [],
    };
    const isEmailValid = new ValidEmail(this.periodExpense.owner).isValid;
    const isWalletNameEmpty = this.periodExpense.wallet.trim().length > 0;
    const isExpensePositiveNumber = Number(this.periodExpense.expense) > 0;
    const isNameIsEmpty = this.periodExpense.name.trim().length > 0;
    
    // TODO: Validate date here
    const rules: IValidData[] = [
      {
        isValid: isEmailValid,
        message: 'Email is invalid',
      },
      {
        isValid: isWalletNameEmpty,
        message: 'Wallet name is invalid',
      },
      {
        isValid: isExpensePositiveNumber,
        message: 'Expense is not a positive number',
      },
      {
        isValid: isNameIsEmpty,
        message: 'Name of the subscription is not valid'
      },
    ];

     rules.forEach(rule => {
       if (rule.isValid === false) {
        result.isValid = false;
        result.message.push(rule.message);
      }
     });
    
     return result;
  }

  public isValid: IValidData = null;

  // public isValid(): IValidData {
    
    

   
  //   return {
      
  //   }
  // }
}

export default ValidPeriodExpense;

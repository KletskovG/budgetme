import IExpense from "./IExpense";
import IIncome from "./IIncome";
import ITransaction from "./ITransaction";

export default interface IWallet {
  _id: string;
  amount: number;
  owner: string;
  name: string;
  expenses: ITransaction[];
  incomes: ITransaction[];
}

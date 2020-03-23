import IExpense from "./IExpense";
import IIncome from "./IIncome";

export default interface IWallet {
  _id: string;
  amount: number;
  owner: string;
  name: string;
  expenses: IExpense[];
  incomes: IIncome[];
}

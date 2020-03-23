import ITransaction from "../../../../interfaces/ITransaction";

export default interface ITransactionProperties {
  isExpense: boolean;
  transaction: ITransaction;
}
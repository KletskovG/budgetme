export default interface IWallet {
  _id?: object;
  amount: number;
  owner: string;
  name: string;
  expenses: [
    {
      count: number;
      category: string;
      timestamp: string;
    }?
  ];
  incomes: [
    {
      count: number;
      category: string;
      timestamp: string;
    }?
  ];
}

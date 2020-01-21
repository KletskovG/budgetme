export default interface IWallet {
  amount: number;
  budget: {
    amount: number;
    deadline: string;
    expenses: [{ count: number; name: string }?];
    notify: string;
  };
  owner: string;
  savings: {
    amount: number;
    percent: number;
    save: number;
  };
}

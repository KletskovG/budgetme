import mongoose from 'mongoose';
import IIncome from './IIncome';
const { Schema } = mongoose;

export interface IWallet extends mongoose.Document {
  amount: number;
  owner: string;
  expenses: [
    {
      count: number;
      category: string;
      timestamp: string;
      createdAt?: string;
      updatedAt?: string;
    }?
  ];
  incomes: IIncome[];
}

export interface IWalletBase {
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

export const schema = new Schema({
  amount: Number,
  owner: String,
  name: String,
  expenses: [
    {
      count: Number,
      category: String,
      timestamp: String,
    }
  ],
  incomes: [
    {
      count: Number,
      category: String,
      timestamp: {
        type: String,
        required: false,
      },
    }
  ],
});

const Wallet = mongoose.model<IWallet>('wallet', schema);
export default Wallet;

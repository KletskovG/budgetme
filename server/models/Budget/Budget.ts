
import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IBudget extends mongoose.Document {
  ownerId: string;
  owner: string;
  walletId: string;
  estimate: number;
  amount: number;
  isMonthly: boolean;
  expenses: [
    {
      count: number;
      category: string;
      timestamp: string;
    }?
  ];
  currency: string;
}

export interface IBudgetBase {
  id?: string;
  ownerId: string;
  owner: string;
  walletId: string;
  estimate: number;
  amount: number;
  isMonthly: boolean;
  expenses: [
    {
      count: number;
      category: string;
      timestamp: string;
    }?
  ];
  currency: 'RUB' | 'USD' | 'EUR';
}

const schema = new Schema({
  ownerId: String,
  owner: String,
  walletId: String,
  estimate: Number,
  amount: Number,
  isMonthly: Boolean,
  expenses: [
    {
      count: Number,
      category: String,
      timestamp: String,
    }
  ],
  // TODO: check for type like in IBudgetBase
  currency: String,
});

export const Budget = mongoose.model<IBudget>('budget', schema);



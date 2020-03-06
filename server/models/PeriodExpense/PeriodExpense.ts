import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IPeriodExpense extends mongoose.Document {
  name: string;
  owner: string;
  wallet: string;
  expense: number;
  dateStarted: string;
  period: string;
}

export interface IPeriodExpenseBase {
  name: string;
  owner: string;
  wallet: string;
  expense: number;
  dateStarted: string;
  period: string;
}

export const schema = new Schema({
  name: String,
  owner: String,
  wallet: String,
  expense: Number,
  dateStarted: String,
  period: String,
});

const PeriodExpense = mongoose.model<IPeriodExpense>('period', schema);
export default PeriodExpense;

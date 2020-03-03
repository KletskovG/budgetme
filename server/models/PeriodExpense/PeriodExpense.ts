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
  
}

export const schema = new Schema({
  
});

const Wallet = mongoose.model<IPeriodExpense>('period', schema);
export default Wallet;

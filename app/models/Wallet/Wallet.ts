import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IWallet extends mongoose.Document {
  amount: number;
  owner: string;
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
      timestamp: String,
    }
  ],
});

const Wallet = mongoose.model<IWallet>('wallet', schema);
export default Wallet;
// const schema = new Schema({
//   amount: Number,
//   budget: {
//     amount: Number,
//     deadline: String,
//     expenses: [
//       {
//         count: Number,
//         name: String,
//       },
//     ],
//     notify: String, // 1 - 100% or number
//   },
//   owner: String,
//   savings: {
//     amount: Number,
//     percent: Number,
//     save: Number,
//   },
// });

// export default mongoose.model('wallet', schema);

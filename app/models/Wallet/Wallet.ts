import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = new Schema({
  amount: Number,
  budget: {
    amount: Number,
    deadline: String,
    expenses: [
      {
        count: Number,
        name: String,
      },
    ],
    notify: String, // 1 - 100% or number
  },
  owner: String,
  savings: {
    amount: Number,
    percent: Number,
    save: Number,
  },
});

export default mongoose.model('wallet', schema);

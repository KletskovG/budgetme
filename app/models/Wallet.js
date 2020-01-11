const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  owner: String,
  amount: Number,
  budget: {
    deadline: String,
    amount: Number,
    notify: String, // 1 - 100% or number
    expenses: [
      {
        name: String,
        count: Number,
      },
    ],
  },
  savings: {
    percent: Number,
    amount: Number,
    save: Number,
  }
});

module.exports = mongoose.model('wallet', schema);
const mongoose = require('mongoose');
const Wallet = require('./Wallet');
const { Schema } = mongoose;

const schema = new Schema({
  id: Number,
  first_name: String,
  last_name: String,
  username: String,
  wallets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wallet',
    },
  ],
});

module.exports = mongoose.model('user', schema);
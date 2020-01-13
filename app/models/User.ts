import mongoose from 'mongoose';
import Wallet from './Wallet';

const { Schema } = mongoose;

const schema = new Schema({
  first_name: String,
  id: Number,
  last_name: String,
  username: String,
  wallets: [
    {
      ref: 'Wallet',
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

export default mongoose.model('user', schema);

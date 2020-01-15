
import mongoose from 'mongoose';
import Wallet from '../Wallet/Wallet';
const { Schema } = mongoose;

const schema = new Schema({
  first_name: String,
  id: Number,
  last_name: String,
  username: String,
  wallet: {
    ref: 'Wallet',
    type: mongoose.Schema.Types.ObjectId,
  },
  store: Object,
});

export default mongoose.model('user', schema);

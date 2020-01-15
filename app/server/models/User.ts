import mongoose from 'mongoose';

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
});

export default mongoose.model('user', schema);

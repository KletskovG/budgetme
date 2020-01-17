
import mongoose from 'mongoose';
import Wallet from '../Wallet/Wallet';
import IWallet from '../Wallet/IWallet';
const { Schema } = mongoose;

export interface IUser extends mongoose.Document {
  first_name: string;
  id: number;
  last_name: string;
  username: string;
  wallet: IWallet;
  store: object;
}

export interface IUserBase {
  first_name: string;
  id: number;
  last_name: string;
  username: string;
  wallet: IWallet;
  store: object;
}

export const schema = new Schema({
  first_name: String,
  id: Number,
  last_name: String,
  username: String,
  wallet: Object,
  store: Object,
});

const UserModel = mongoose.model<IUser>('user', schema);

export default UserModel;

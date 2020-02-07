
import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IUser extends mongoose.Document {
  // first_name: string;
  // id: number;
  // last_name: string;
  // username: string;
  // wallet: IWallet;
  // store: any;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface IUserBase {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export const schema = new Schema({
  // first_name: String,
  // id: Number,
  // last_name: String,
  // username: String,
  // wallet: Object,
  // store: Object,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  id: Number,
});

export const  User = mongoose.model<IUser>('user', schema);



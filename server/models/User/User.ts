
import mongoose from 'mongoose';
import ICategory from './ICategory';
const { Schema } = mongoose;

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  categories: ICategory[];
}

export interface IUserBase {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  categories: ICategory[];
}

export const schema = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  id: Number,
  categories: [
    {
      name: String,
      emoji: String,
    }
  ]
});

export const  User = mongoose.model<IUser>('user', schema);



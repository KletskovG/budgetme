import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IEmoji extends mongoose.Document {
  emoji: string;
  isExpense: boolean;
}

export interface IEmojiBase {
  emoji: string;
  isExpense: boolean;
}

export const schema = new Schema({
  emoji: String,
  isExpense: Boolean,
});

export const User = mongoose.model<IEmoji>('emoji', schema);

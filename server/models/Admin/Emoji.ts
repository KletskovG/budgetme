import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IEmoji extends mongoose.Document {
  emoji: string;
  isExpense: boolean;
  index: number;
}

export interface IEmojiBase {
  emoji: string;
  isExpense: boolean;
  index: number;
}

export const schema = new Schema({
  emoji: String,
  isExpense: Boolean,
  index: Number,
});

export const Emoji = mongoose.model<IEmoji>('emoji', schema);

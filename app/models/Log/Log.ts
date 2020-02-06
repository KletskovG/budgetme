import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface ILog extends mongoose.Document {
  text: string
}

export const schema = new Schema({
  text: String,
}, {
  timestamps: true,
});

const Log = mongoose.model<ILog>('log', schema);

import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface ILog extends mongoose.Document {
  text: string;
  type: string;
  createdAt?: string;
  updatedAt?: string;
}

export const schema = new Schema<ILog>({
  text: String,
  type: String,
}, {
  timestamps: true,
});

const Log = mongoose.model<ILog>('log', schema);

export default Log;

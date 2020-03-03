import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IFrontLog extends mongoose.Document {
  text: string;
  type: string;
}

export const schema = new Schema(
  {
    text: String,
    type: String,
  },
  {
    timestamps: true,
  }
);

const FrontLog = mongoose.model<IFrontLog>('frontlog', schema);

export default FrontLog;

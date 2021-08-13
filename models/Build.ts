import mongoose, { Schema } from 'mongoose';
import { IProduct } from './Product';

export interface IBuilds {
  user: string;
  products: [];
  totalprice: number;
}

const BuildSchema = new Schema<IBuilds>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  products: { type: Array, required: true },
  totalprice: { type: Number, required: true },
});

const Builds = mongoose.model<IBuilds>('build', BuildSchema);

export default Builds;

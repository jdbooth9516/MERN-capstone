import mongoose, { Schema } from 'mongoose';
import { IProduct } from './Product';

export interface IBuilds {
  name: string;
  user: string;
  products: [];
  totalprice: number;
}

const BuildSchema = new Schema<IBuilds>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  name: { type: String, required: true},
  products: { type: Array, required: true },
  totalprice: { type: Number, required: true },
});

const Builds = mongoose.model<IBuilds>('build', BuildSchema);

export default Builds;

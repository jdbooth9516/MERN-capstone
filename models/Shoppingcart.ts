import mongoose, { Schema } from 'mongoose';

export interface IShoppingcart {
  user: string;
  builds: [];
}

const ShoppingcartSchema = new Schema<IShoppingcart>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  builds: { type: Array, required: true },
});

const ShoppingCart = mongoose.model<IShoppingcart>(
  'shopping',
  ShoppingcartSchema
);

export default ShoppingCart;

import mongoose, { Schema } from 'mongoose';

export interface IShoppingcart {
  user: string;
  builds: [];
}

const ShoppingcartSchema = new Schema<IShoppingcart>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  build: { type: Array, required: true },
});

const shoppingCart = mongoose.model<IShoppingcart>(
  'shopping',
  ShoppingcartSchema
);

export default shoppingCart;

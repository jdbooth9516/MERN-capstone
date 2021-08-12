import mongoose, { Schema } from 'mongoose';

export interface IProduct {
  name: string;
  catagory: string;
  shortdesc: string;
  longdesc: string;
  photo: string;
  price: number;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true, unique: true },
  catagory: { type: String, required: true },
  shortdesc: { type: String, required: true },
  longdesc: { type: String, required: true },
  photo: { type: String },
  price: { type: Number, required: true },
});

const Product = mongoose.model<IProduct>('product', ProductSchema);

export default Product;

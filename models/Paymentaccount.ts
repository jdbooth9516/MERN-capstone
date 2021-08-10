import mongoose, { Schema } from 'mongoose';

export interface IPaymentAccount {
  user: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

const PaymentAccountSchema = new Schema<IPaymentAccount>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
});

const PaymentAccount = mongoose.model<IPaymentAccount>(
  'payment',
  PaymentAccountSchema
);
export default PaymentAccount;

import mongoose, { Schema } from 'mongoose';

export interface ICard {
  nameoncard: string;
  cardnumber: string;
  expiredate: string;
  cvv: number;
}

const CardSchema = new Schema<ICard>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  nameonecard: { type: String, required: true },
  cardnumber: { type: String, required: true },
  expiredate: { type: String, required: true },
  cvv: { type: Number, required: true },
});

const Cards = mongoose.model<ICard>('card', CardSchema);

export default Cards;

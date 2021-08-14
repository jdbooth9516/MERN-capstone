import mongoose, { Schema } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  role: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: 'customer' },
  password: { type: String, required: true },
});

const User = mongoose.model<IUser>('user', UserSchema);
export default User;

import express from 'express';
import connectDB from '../config/db';
import cors from 'cors';


const app = express();

export function handleError(error: any, res: any) {
  console.error(error.message);
  res.status(500).json({ msg: 'Server Error' });
}

connectDB();
app.use(express.json());

// enable cors
app.use(cors());

// def Routes here

app.use('/api/users', require('../routes/api/users'));
app.use('/api/login', require('../routes/api/login'));
app.use('/api/paymentaccount', require('../routes/api/payment'));
app.use('/api/cards', require('../routes/api/cards'));
app.use('/api/products', require('../routes/api/products'));
app.use('/api/build', require('../routes/api/build'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server stated on prot ${PORT}`));

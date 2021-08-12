import express from 'express';
import connectDB from '../config/db';

const app = express();

connectDB();
app.use(express.json());
// def Routes here

app.use('/api/users', require('../routes/api/users'));
app.use('/api/login', require('../routes/api/login'));
app.use('/api/paymentaccount', require('../routes/api/payment'));
app.use('/api/cards', require('../routes/api/cards'));
app.use('/api/products', require(('../routes/api/products')))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server stated on prot ${PORT}`));

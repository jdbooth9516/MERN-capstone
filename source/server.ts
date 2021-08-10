import express from 'express';
import connectDB from '../config/db';

const app = express();

connectDB();
app.use(express.json());
// def Routes here

app.use('/api/users', require('../routes/api/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server stated on prot ${PORT}`));

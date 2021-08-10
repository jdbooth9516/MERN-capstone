import express from 'express';
import connectDB from '../config/db';

const app = express();

connectDB();

// def Routes here

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server stated on prot ${PORT}`));

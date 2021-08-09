const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

// Init the Middleware
app.use(express.json({ extended: false }));

// def Routes here

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port${PORT}`));

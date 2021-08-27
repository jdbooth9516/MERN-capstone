import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Route: POST api/order
// DESC: add the order
// ACCESS: private

router.get('/', async (req: Request, res: Response) => {
  try {
    const orders = await Orders.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

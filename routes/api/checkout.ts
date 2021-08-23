import express, { json, Request, Response } from 'express';

const router = express.Router();

const stripe = require('stripe')(
  'sk_test_51J09k7IegiEVwxhXjGVmOxHgTFqdKvLd18n3vnSTs13X8pv5AOy0QEvKyOGVsfDjiDad3OOIbu1lkm5pf3mfGHHI00shdRRtYE'
);

// Route: POST api/checkout
// DESC: run the payment
// ACCESS: private

router.post('/', async (req: Request, res: Response) => {
  const totalprice = req.body.totalprice;

  const formatedPrice = totalprice * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: formatedPrice,
    currency: 'usd',
  });

  res.send({
    amount: formatedPrice,
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = router;

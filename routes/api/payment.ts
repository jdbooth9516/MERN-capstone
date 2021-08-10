import express from 'express';
import auth from '../../middleware/auth';
import PaymentAccount, { IPaymentAccount } from '../../models/Paymentaccount';
import { body, validationResult } from 'express-validator';
import User from '../../models/User';

const router = express.Router();

// ROUTE: POST /api/paymentaccount
// DESC:  Create a payment account
// ACCESS: Private

router.post(
  '/',
  [
    auth,
    body('address', 'Address is required').not().isEmpty(),
    body('city', 'City is required').not().isEmpty(),
    body('state', 'State is required').not().isEmpty(),
    body('zip', 'zip is required').not().isEmpty(),
  ],

  async (req: any, res: any) => {
    // check the validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    // deconstruction
    const { address, city, state, zip } = req.body;

    // build the account object
    const accountFields = <IPaymentAccount>{};
    accountFields.user = req.user.id;
    if (address) accountFields.address = address;
    if (city) accountFields.city = city;
    if (state) accountFields.state = state;
    if (zip) accountFields.zip = zip;

    try {
      let paymentAccount = await PaymentAccount.findOne({ user: req.user.id });

      //update if there is already a payment account
      if (paymentAccount) {
        paymentAccount = await PaymentAccount.findOneAndUpdate(
          { user: req.user.id },
          { $set: accountFields },
          { new: true }
        );
        return res.json(paymentAccount);
      }

      // create a new account if one doesn't exist
      paymentAccount = new PaymentAccount(accountFields);

      await paymentAccount.save();
      res.json(paymentAccount);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;

import express, { json, Request, Response } from 'express';
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

  async (req: Request, res: Response) => {
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

// ROUTE: get /api/paymentaccount/:user_id
// DESC:  Get payment account based off of the user
// ACCESS: Private
router.get('/:user_id', auth, async (req: Request, res: Response) => {
  try {
    //params == the id from the url
    const paymentAccount = await PaymentAccount.findOne({
      user: req.params.user_id,
    }).populate('user', ['name']);

    if (!paymentAccount) {
      res.status(400).json({ msg: 'Payment Account not found' });
    }
    res.json(paymentAccount);
  } catch (error) {
    console.error(error.message);
    //look to see if the id is invalid
    if (error.kind == 'ObjedctId') {
      return res.status(400).json({ msg: 'Payment Account not found' });
    }
    res.status(500).send('server error');
  } // Route: Delete api/profile
  //DESC: Delete user and profile and post
  //ACCESS: Private
});

// Route: Delete api/paymentaccount
// DESC: Delete user and profile and post
// ACCESS: Private

router.delete('/', auth, async (req: Request, res: Response) => {
  try {
    //Remove the payment account
    await PaymentAccount.findOneAndRemove({
      user: req.user.id,
    });
    res.status(200).json({ msg: 'Account Deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      msg: 'Server Error',
    });
  }
});
module.exports = router;

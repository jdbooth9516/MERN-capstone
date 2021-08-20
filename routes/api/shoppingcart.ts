import express, { json, Request, Response } from 'express';
import {
  body,
  buildSanitizeFunction,
  validationResult,
} from 'express-validator';
import { IShoppingcart } from '../../models/Shoppingcart';
import auth from '../../middleware/auth';

import ShoppingCart from '../../models/Shoppingcart';
import Builds from '../../models/Build';

const router = express.Router();

// Route: POST api/shoppincart
// DESC: create the shoppingcart
// ACCESS: private

router.post(
  '/',
  [
    auth,
    body('user', 'user is required').not().isEmpty(),
    body('builds', 'build are required').not().isEmpty(),
  ],

  async (req: Request, res: Response) => {
    // check the validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    // deconstruction
    const { user, builds } = req.body;

    //build the cart object
    const cartFields = <IShoppingcart>{};
    cartFields.user = user;
    if (builds) cartFields.builds = builds;

    try {
      let shoppingcart = await ShoppingCart.findOne({ user: user });

      if (shoppingcart) {
        shoppingcart = await ShoppingCart.findOneAndUpdate(
          { user: user },
          { $set: cartFields },
          { new: true }
        );
        return res.json(shoppingcart);
      }

      // create a new cart if one is not found
      shoppingcart = new ShoppingCart(cartFields);

      await shoppingcart.save();
      res.json(shoppingcart);
    } catch (error) {
      console.error(error);
    }
  }
);

// Route: POST api/shoppincart/:userid
// DESC: create the shoppingcart
// ACCESS: private

router.get('/user', auth, async (req: Request, res: Response) => {
  try {
    const carts = await ShoppingCart.find({ user: req.user.id });
    if (Builds.length === 0) {
      res.status(400).json({ msg: 'No Cart found for this user' });
    } else {
      res.json(carts);
    }
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;

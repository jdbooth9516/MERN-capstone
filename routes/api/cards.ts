import express, { json, Request, Response } from 'express';
import auth from '../../middleware/auth';
import { body, validationResult } from 'express-validator';
import Cards, { ICard } from '../../models/Cards';
import User from '../../models/User';

const router = express.Router();

// ROUTE: POST /api/cards
// DESC:  Create or update a new Card
// ACCESS: Private
router.post(
  '/',
  [
    auth,
    body('nameoncard', 'Name is required').not().isEmpty(),
    body('cardnumber', 'Card number is required').not().isEmpty(),
    body('expiredate', 'Expiration date is required').not().isEmpty(),
    body('cvv', 'CVV is required').not().isEmpty(),
  ],
  async (req: Request, res: Response) => {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    // deconstruction
    const { nameoncard, cardnumber, expiredate, cvv } = req.body;

    const cardFields = <ICard>{};
    cardFields.user = req.user.id;
    if (nameoncard) cardFields.nameoncard = nameoncard;
    if (cardnumber) cardFields.cardnumber = cardnumber;
    if (expiredate) cardFields.expiredate = expiredate;
    if (cvv) cardFields.cvv = cvv;

    // upadate if there is a card already
    try {
      let card = await Cards.findOne({ user: req.user.id });
      if (card) {
        card = await Cards.findOneAndUpdate(
          { user: req.user.id },
          { $set: cardFields },
          { new: true }
        );
        return res.json(card);
      }
      // create a new card if one does not exist;
      card = new Cards(cardFields);
      await card.save();
      res.json(card);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// ROUTE: Get /api/cards/:user_id
// DESC:  get card by user id
// ACCESS: Private

router.get('/:user_id');
module.exports = router;

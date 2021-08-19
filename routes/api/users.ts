import express, { json, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import auth from '../../middleware/auth';
import { body, validationResult } from 'express-validator';

const router = express.Router();
import User from '../../models/User';

// Route: POST api/users
// DESC: Register User
// ACCESS: private
router.post(
  '/',
  [
    // post request validation
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').not().isEmpty(),
    body(
      'password',
      'Please enter a password that is 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, role, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          errors: [
            {
              msg: 'User already exsist',
            },
          ],
        });
      }
      user = new User({
        name,
        email,
        role,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// Route: Delete api/users
// DESC: delet user
// ACCESS: private

router.delete('/', auth, async (req: Request, res: Response) => {
  try {
    //Remove User
    await User.findOneAndRemove({
      _id: req.user.id,
    });
    res.json({ msg: 'user deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Route: GET api/users
// DESC: Get all users
// ACCESS: public

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;

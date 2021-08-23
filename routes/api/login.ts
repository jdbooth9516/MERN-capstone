import express, { json } from 'express';
import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User from '../../models/User';

const router = express.Router();

// Route: POST api/auth
//DESC: login route
//ACCESS: auth

router.post(
  '/',
  [
    body('email', 'Please enter a email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    //deconstructer
    const { email, password } = req.body;

    try {
      // check to see if the user already exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      // check to see if the passwords match
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // format the information for the token
      const payload = {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
    }
  }
);

module.exports = router;

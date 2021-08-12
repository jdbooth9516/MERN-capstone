import express, { json, Request, Response } from 'express';
import config from 'config';
import auth from '../../middleware/auth';
import { body, validationResult } from 'express-validator';
import { IProduct } from '../../models/Product';

import Product from '../../models/Product';

const router = express.Router();

// Route: POST api/products
// DESC: create a new product
// ACCESS: Public

router.post(
  '/',
  [
    body('name', 'Product Name is required').not().isEmpty(),
    body('catagory', 'Product catagory is required').not().isEmpty(),
    body('shortdesc', 'Product shortdesc is required').not().isEmpty(),
    body('longdesc', 'Product longdesc is required').not().isEmpty(),
    body('price', 'Product Price is required').not().isEmpty(),
  ],
  async (req: Request, res: Response) => {
    // check to see if the validator has and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // deconstruct the body
    const { name, catagory, shortdesc, longdesc, photo, price } = req.body;

    // build the product object
    const productFields = <IProduct>{};
    if (name) productFields.name = name;
    if (catagory) productFields.catagory = catagory;
    if (shortdesc) productFields.shortdesc = shortdesc;
    if (longdesc) productFields.longdesc = longdesc;
    if (photo) productFields.photo = photo;
    if (price) productFields.price = price;

    try {
      const product = new Product(productFields);

      await product.save();
      res.json(product);
    } catch (error) {
      console.error(error.message);
    }
  }
);

// Route: GET api/products
// DESC: Get all products
// ACCESS: public

router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;

import express, { json, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { IProduct } from '../../models/Product';

import Product from '../../models/Product';

const router = express.Router();

// Route: POST api/products
// DESC: create a new product
// ACCESS: Public

router.post(
  '/',
  [body('name', 'Product Name is required').not().isEmpty()],
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
      let product = await Product.findOne({ name: req.body.name });
      // update the product if it already exist
      if (product) {
        product = await Product.findOneAndUpdate(
          { name: req.body.name },
          { $set: productFields },
          { new: true }
        );
        return res.json(product);
      }

      product = new Product(productFields);

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

// Route: GET api/products/:catagory
// DESC: Get all products by catagory
// ACCESS: public

router.get('/:catagory', async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ catagory: req.params.catagory });
    if (products.length == 0) {
      res.status(400).json({ msg: 'No products found with that catagory' });
    } else {
      res.json(products);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});
module.exports = router;

import express, { Request, Response } from 'express';
import auth from '../../middleware/auth';
import { body, validationResult } from 'express-validator';
import Builds, { IBuilds } from '../../models/Build';

const router = express.Router();

// ROUTE: POST /api/builds
// DESC:  Create a new build
// ACCESS: Private

router.post(
  '/',
  [
    auth,
    body('products', 'Products are required').not().isEmpty(),
    body('totalprice', 'Total is required').not().isEmpty(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    // deconstruction
    const { products, totalprice } = req.body;

    const buildFields = <IBuilds>{};
    buildFields.user = req.user.id;
    if (totalprice) buildFields.totalprice = totalprice;
    if (products) buildFields.products = products;

    try {
      let build = new Builds(buildFields);
      await build.save();
      res.json(build);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;

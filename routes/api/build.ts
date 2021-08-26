import express, { Request, Response } from 'express';
import auth from '../../middleware/auth';
import { body, validationResult } from 'express-validator';
import Builds, { IBuilds } from '../../models/Build';
import { handleError } from '../../source/server';

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
    const { buildname, products, totalprice } = req.body;

    const buildFields = <IBuilds>{};
    buildFields.user = req.user.id;
    if (buildname) buildFields.buildname = buildname;
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
// ROUTE: GET /api/builds/user
// DESC:  get all builds by user
// ACCESS: Private

router.get('/user', auth, async (req: Request, res: Response) => {
  try {
    const builds = await Builds.find({ user: req.user.id });
    if (builds.length === 0) {
      res.status(400).json({ msg: 'No builds found for that user' });
    } else {
      res.json(builds);
    }
  } catch (error) {
    handleError(error, res);
  }
});

// ROUTE; GET /api/builds
// DESC: get all the builds
// ACCESS: public

router.get('/', async (req: Request, res: Response) => {
  try {
    const builds = await Builds.find();
    res.json(builds);
  } catch (error) {
    handleError(error, res);
  }
});

// ROUTE; GET /api/builds
// DESC: Delete a build
// ACCESS: private

router.delete('/:buildname', auth, async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    //Remove the payment account
    await Builds.findOneAndRemove({
      buildname: req.params.buildname,
    });
    res.status(200).json({ msg: 'Build Deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      msg: 'Server Error',
    });
  }
});

module.exports = router;

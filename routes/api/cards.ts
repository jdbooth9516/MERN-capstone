import express, { json, Request, Response } from 'express';
import auth from '../../middleware/auth';
import { body, validationResult } from 'express-validator';
import User from '../../models/User';

const router = express.Router();

module.exports = router;

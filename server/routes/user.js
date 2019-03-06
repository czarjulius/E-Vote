import express from 'express';
import User from '../controllers/userController';
import { validateSignup, validateLogin } from '../middleware/valiadateUser';

const router = express.Router();

router.post('/auth/signup', validateSignup, User.userSignup);

router.post('/auth/login', validateLogin);

export default router;

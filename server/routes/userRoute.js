import express from 'express';
import User from '../controllers/userController';
import { validateSignup, validateLogin } from '../middleware/validateUser';

const router = express.Router();
router.post('/auth/signup', validateSignup, User.userSignup);
router.post('/auth/login', validateLogin, User.userLogin);

export default router;

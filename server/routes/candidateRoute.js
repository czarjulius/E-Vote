import express from 'express';
import Candidate from '../controllers/candidateController';
import admin from '../middleware/authorization';
import auth from '../middleware/authentication';
import { validateCandidate } from '../middleware/validateOffice';

const router = express.Router();

router.post('/candidate/:userId/register', auth, admin, Candidate.registerCandidate);

export default router;

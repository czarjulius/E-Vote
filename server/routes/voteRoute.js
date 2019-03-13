import express from 'express';
import Candidate from '../controllers/candidateController';
import auth from '../middleware/authentication';
import validateVote from '../middleware/validateVote';

const router = express.Router();


router.post('/vote', auth, validateVote, Candidate.vote);
router.get('/:officeId/result', auth, Candidate.electionResult);

export default router;

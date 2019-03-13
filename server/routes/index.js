import express from 'express';
import userRoute from './userRoute';
import partyRoute from './partyRoute';
import officeRoute from './officeRoute';
import candidateRoute from './candidateRoute';

const router = express.Router();

router.use('/api/v1', userRoute);
router.use('/api/v1', partyRoute);
router.use('/api/v1', officeRoute);
router.use('/api/v1', candidateRoute);


export default router;

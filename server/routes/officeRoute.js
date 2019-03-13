import express from 'express';
import Office from '../controllers/officeController';
import admin from '../middleware/authorization';
import auth from '../middleware/authentication';
import { validateOffice } from '../middleware/validateOffice';
import validateId from '../middleware/validateId';

const router = express.Router();


router.post('/offices', auth, admin, validateOffice, Office.createOffice);
router.get('/offices', auth, Office.getAllOffices);
router.get('/offices/:id', validateId, auth, Office.getASpecificOffice);

export default router;

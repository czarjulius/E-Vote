import express from 'express';
import Party from '../controllers/partyController';
import admin from '../middleware/authorization';
import auth from '../middleware/authentication';
import { validateParty, validatePartyName } from '../middleware/validateParty';
import validateId from '../middleware/validateId';

const router = express.Router();

router.post('/parties', auth, admin, validateParty, Party.createParty);
router.get('/parties', auth, Party.getAllParties);
router.get('/parties/:id', auth, validateId, Party.getASpecificParty);
router.patch('/parties/:id/name', auth, admin, validatePartyName, Party.editPartyName);
router.delete('/parties/:id', auth, admin, validateId, Party.deleteParty);

export default router;

/* eslint-disable consistent-return */
import { check, validationResult } from 'express-validator/check';
import db from '../models/db';

const validateOffice = [
  check('name')
    .matches(/^[a-zA-Z ]+$/)
    .withMessage('name must contain only alphabets')
    .custom(value => db.query('select * from offices where LOWER(name) = LOWER($1)', [value]).then((office) => {
      if (office.rowCount >= 1) throw new Error('name already exists');
    }))
    .trim(),
  check('type')
    .exists()
    .withMessage('type is required')
    .isIn(['federal', 'state', 'local government', 'legislative'])
    .withMessage('only federal, state, local government, legislative are allowed')
    .trim(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        error: errors.array().map(i => i.msg),
      });
    }
    next();
  },
];

const validateCandidate = [
  check('officeId')
    .isNumeric()
    .withMessage('officeId should be a number')
    .trim(),
  check('partyId')
    .isNumeric()
    .withMessage('partyId must contain only numbers')
    .trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        error: errors.array().map(i => i.msg),
      });
    }
    next();
  },
];

export { validateOffice, validateCandidate };

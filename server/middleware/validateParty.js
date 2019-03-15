/* eslint-disable consistent-return */
import { check, validationResult } from 'express-validator/check';
import db from '../models/db';


const validateParty = [
  check('name')
    .matches(/^[A-Za-z.\s_-]+$/)
    .withMessage('name already exists')
    .matches(/^[a-zA-Z ]+$/)
    .withMessage('name must contain only alphabets')
    .isLength({ min: 2 })
    .withMessage('name must have atleast 2 characters')
    .isLength({ max: 50 })
    .withMessage('name cannot have more than 15 characters')
    .custom(value => db.query('select * from parties where name = $1', [value]).then((party) => {
      if (party.rowCount >= 1) throw new Error('name already exists');
    }))
    .trim(),
  check('hqAddress')
    .exists()
    .withMessage('Please input an address')
    .trim(),
  check('logoUrl')
    .optional()
    .withMessage('please upload image'),
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

const validatePartyName = [
  check('name')
    .matches(/^[A-Za-z.\s_-]+$/)
    .withMessage('name already exists')
    .matches(/^[a-zA-Z ]+$/)
    .withMessage('name must contain only alphabets')
    .custom(value => db.query('select * from parties where name = $1', [value]).then((party) => {
      if (party.rowCount >= 1) throw new Error('name already exists');
    }))
    .trim()
    .isLength({ min: 2 })
    .withMessage('name must have atleast 2 characters')

    .isLength({ max: 50 })
    .withMessage('name cannot have more than 15 characters'),
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


export { validateParty, validatePartyName };

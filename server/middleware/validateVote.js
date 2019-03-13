/* eslint-disable consistent-return */
import { check, validationResult } from 'express-validator/check';

const validateVote = [
  check('office')
    .isNumeric()
    .withMessage('office should be a number')
    .trim(),
  check('candidate')
    .isNumeric()
    .withMessage('candidate should be a number')
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

export default validateVote;

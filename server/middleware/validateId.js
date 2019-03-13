/* eslint-disable consistent-return */
const validateId = (req, res, next) => {
  const { id } = req.params;
  if ((id % 1) !== 0 || isNaN(id) || id < 1) {
    return res.status(400).json({
      status: 400,
      error: 'id must be a positive integer',
    });
  }
  next();
};

export default validateId;

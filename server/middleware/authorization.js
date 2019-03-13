// eslint-disable-next-line consistent-return
const admin = (req, res, next) => {
  if (req.userData.admin === false) {
    return res.status(403).json({
      status: 403,
      error: 'Access denied! You are not an Admin',
    });
  }
  next();
};

export default admin;

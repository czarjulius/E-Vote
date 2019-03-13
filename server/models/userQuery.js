const userSignup = `INSERT INTO users(firstName, lastname, otherName, email, password, phoneNumber, passportUrl)
VALUES($1, $2, $3, $4, $5, $6, $7)
RETURNING id, firstName, lastName, otherName, email, phoneNumber, passportUrl, isAdmin, registeredOn`;
const userDetails = 'SELECT * FROM users WHERE email = $1';

const fullName = 'SELECT firstname ||\' \'|| lastname as name FROM users WHERE email=$1';

export {
  userSignup, userDetails, fullName,
};

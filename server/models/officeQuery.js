const createOffice = 'INSERT INTO offices(type, name) VALUES($1,$2) RETURNING *';
const getOffice = 'SELECT * FROM offices LIMIT 6';
const office = 'SELECT * FROM offices WHERE id = $1';

export { createOffice, getOffice, office };

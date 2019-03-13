const createParty = 'INSERT INTO parties(name, hqAddress, logoUrl) VALUES($1,$2,$3) RETURNING *';
const getParty = 'SELECT * FROM parties LIMIT 6';
const party = 'SELECT * FROM parties WHERE id = $1';
const updatePartyName = 'UPDATE parties SET name = $1 WHERE id = $2';
const deleteParty = 'DELETE from parties where id = $1';

export {
  getParty, createParty, party, updatePartyName, deleteParty,
};

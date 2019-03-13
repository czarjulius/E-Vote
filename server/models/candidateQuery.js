const checkUser = 'select * from users where id = $1';
const checkOffice = 'select * from offices where id = $1';
const checkParty = 'select * from parties where id = $1';
const candidateExists = 'select * from candidates where userId = $1 and partyId=$2';
const insertCandidate = 'INSERT into candidates(officeId, partyId, userId) VALUES($1,$2,$3) RETURNING *';
const checkCandidate = 'select * from candidates where id = $1';
const checkVote = 'select * from votes where officeId =$1 and createdBy= $2';
const insertVote = 'INSERT into votes(createdBy, officeId, candidateId) VALUES($1,$2,$3) RETURNING *';
const voteResult = 'SELECT officeId, candidateId, COUNT(candidateId) AS result FROM votes WHERE officeId=$1 GROUP BY candidateId, officeId';

export {
  checkUser,
  checkOffice,
  checkParty,
  candidateExists,
  insertCandidate,
  checkCandidate,
  checkVote,
  insertVote,
  voteResult,
};

const users = 'select * from users where id = $1';

const offices = 'select * from offices where id = $1';

const parties = 'select * from parties where id = $1';

const candidates = 'select * from candidates where userId = $1';
const newCndidate = 'INSERT into candidates(officeId, partyId, userId) VALUES($1,$2,$3) RETURNING *';

const checkCandidate = 'select * from candidates where id = $1';
const checkVote = 'select * from votes where officeId =$1 and createdBy= $2';
const insertVote = 'INSERT into votes(createdBy, officeId, candidateId) VALUES($1,$2,$3) RETURNING *';
const voteResult = 'SELECT officeId, candidateId, COUNT(candidateId) AS result FROM votes WHERE officeId=$1 GROUP BY candidateId, officeId';

export {
  users,
  offices,
  parties,
  candidates,
  newCndidate,
  checkCandidate,
  checkVote,
  insertVote,
  voteResult,
};

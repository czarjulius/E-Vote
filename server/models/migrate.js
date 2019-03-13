/* eslint-disable consistent-return */
import db from './db';
import logger from '../config/winston';

const tableQuery = async () => {
  try {
    const dropUserTable = await db.query('DROP TABLE IF EXISTS users CASCADE;');
    const dropPartyTable = await db.query('DROP TABLE IF EXISTS parties CASCADE;');
    const dropOfficeTable = await db.query('DROP TABLE IF EXISTS offices CASCADE;');
    const dropCandidateTable = await db.query('DROP TABLE IF EXISTS candidates CASCADE;');
    const dropvoteTable = await db.query('DROP TABLE IF EXISTS votes;');

    const userTable = await db.query(`CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      firstName VARCHAR(50) NOT NULL,
      lastNAme VARCHAR(50) NOT NULL,
      otherName VARCHAR(50),
      email VARCHAR(50) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phoneNumber VARCHAR(15) NOT NULL,
      passportUrl TEXT,
      isAdmin BOOLEAN DEFAULT FALSE,
      registeredOn DATE DEFAULT CURRENT_TIMESTAMP
    )`);

    const partyTable = await db.query(`CREATE TABLE IF NOT EXISTS parties(
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL,
      hqAddress VARCHAR(250) NOT NULL,
      logoUrl VARCHAR(250) NOT NULL);`);

    const officeTable = await db.query(`CREATE TABLE IF NOT EXISTS offices(
      id SERIAL PRIMARY KEY,
      type VARCHAR(50) NOT NULL,
      name VARCHAR(50) UNIQUE NOT NULL);`);

    const candidateTable = await db.query(`CREATE TABLE IF NOT EXISTS candidates(
      id SERIAL UNIQUE NOT NULL,
      officeId INT NOT NULL REFERENCES offices(id) ON DELETE CASCADE,
      partyId INT NOT NULL REFERENCES parties(id) ON DELETE CASCADE,
      userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      PRIMARY KEY (userId, officeId));`);

    const voteTable = await db.query(`CREATE TABLE IF NOT EXISTS votes(
      id SERIAL NOT NULL,
      createdOn DATE DEFAULT CURRENT_TIMESTAMP,
      createdBy INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      officeId INT NOT NULL REFERENCES offices(id) ON DELETE CASCADE,
      candidateId INT NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
      PRIMARY KEY (officeId, createdBy));`);
    logger.info(dropUserTable, dropPartyTable, dropOfficeTable, dropCandidateTable, dropvoteTable);
  } catch (err) {
    logger.error(err.stack);
    return err.stack;
  }
};

tableQuery();

/* eslint-disable consistent-return */
import {
  checkUser, checkOffice, checkParty, candidateExists, insertCandidate, checkCandidate,
  checkVote, insertVote, voteResult,
} from '../models/candidateQuery';
import db from '../models/db';

class Candidate {
  static async registerCandidate(req, res) {
    try {
      const { userId } = req.params;
      const { officeId, partyId } = req.body;

      const { rows } = await db.query(checkUser, [userId]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'user not found',
        });
      }

      const { officeRows } = await db.query(checkOffice, [officeId]);
      if (!officeRows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'office not found',
        });
      }

      const { partyRows } = await db.query(checkParty, [partyId]);
      if (!partyRows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'party not found',
        });
      }

      const { candidateRows } = await db.query(candidateExists, [userId, partyId]);
      if (candidateRows.rowCount >= 1) {
        return res.status(406).json({
          status: 406,
          error: 'canditate has already been registered',
        });
      }
      const { result } = await db.query(insertCandidate, [officeId, partyId, userId]);
      console.log(result);
      console.log(result.rows);
      res.status(201).json({
        status: 201,
        data: {
          id: result[0].id,
          office: result[0].officeid,
          user: result[0].userid,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

  static async vote(req, res) {
    try {
      const { office, candidate } = req.body;
      const voter = req.userData.id;

      const { officeRows } = await db.query(checkOffice, [office]);
      if (!officeRows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'office not found',
        });
      }
      const { candidateRows } = await db.query(checkCandidate, [candidate]);
      if (!candidateRows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'candidate not found',
        });
      }
      const { voteRows } = await db.query(checkVote, [office, voter]);
      if (voteRows.rowCount >= 1) {
        return res.status(406).json({
          status: 406,
          error: ' You cannot vote for the same office twice',
        });
      }

      const { result } = await db.query(insertVote, [voter, office, candidate]);
      res.status(201).json({
        status: 201,
        data: {
          office: result[0].officeid,
          candidate: result[0].candidateid,
          voter: result.rows[0].createdby,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

  static async electionResult(req, res) {
    try {
      const { officeId } = req.params;
      if (isNaN(officeId)) {
        return res.status(400).json({
          status: 400,
          error: 'id is not a number',
        });
      }
      const { officeRows } = await db.query(checkOffice, [officeId]);
      if (!officeRows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'office not found',
        });
      }
      const { electionResult } = await db.query(voteResult, [officeId]);
      if (!electionResult[0]) {
        return res.status(404).json({
          status: 404,
          error: 'no result for this office yet',
        });
      }
      res.status(201).json({
        status: 200,
        data: electionResult.rows,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }
}

export default Candidate;
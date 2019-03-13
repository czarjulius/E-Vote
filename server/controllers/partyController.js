/* eslint-disable consistent-return */
import db from '../models/db';
import {
  createParty, getParty, party, updatePartyName, deleteParty,
} from '../models/partyQuery';

class Party {
  static async createParty(req, res) {
    try {
      const { name, hqAddress, logoUrl } = req.body;

      const values = [name, hqAddress, logoUrl];
      const { rows } = await db.query(createParty, values);
      res.status(201).json({
        status: 201,
        data: rows[0],
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

  static async getAllParties(req, res) {
    try {
      const result = await db.query(getParty);
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 400,
          error: 'no party created yet',
        });
      }
      return res.status(200).json({
        status: 200,
        data: result.rows,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

  static async getASpecificParty(req, res) {
    try {
      const { id } = req.params;
      const { rows } = await db.query(party, [id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'party not found',
        });
      }

      return res.status(200).json({
        status: 200,
        data: rows[0],
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

  static async editPartyName(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const { rows } = await db.query(party, [id]);
    if (!rows[0]) {
      return res.status(404).json({
        status: 404,
        error: 'party not found',
      });
    }

    await db.query(updatePartyName, [name, id]);
    const result = await db.query(party, [id]);
    try {
      res.status(200).json({
        status: 200,
        message: 'party name has been updated successfully',
        data: result.rows[0].name,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

  static async deleteParty(req, res) {
    try {
      const { id } = req.params;
      let { rows } = await db.query(party, [id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'party not found',
        });
      }
      rows = await db.query(deleteParty, [id]);

      res.status(200).json({
        message: 'political party has been deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }
}

export default Party;

/* eslint-disable consistent-return */
import { createOffice, getOffice, office } from '../models/officeQuery';
import db from '../models/db';

class Office {
  static async createOffice(req, res) {
    try {
      const { type, name } = req.body;
      const values = [type, name];
      const { rows } = await db.query(createOffice, values);
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

  static async getAllOffices(req, res) {
    try {
      const result = await db.query(getOffice);
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 400,
          error: 'no office has been created yet',
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

  static async getASpecificOffice(req, res) {
    try {
      const { id } = req.params;
      const { rows } = await db.query(office, [id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'office not found',
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
}
export default Office;

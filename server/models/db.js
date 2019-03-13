import { Pool } from 'pg';
import 'dotenv/config';

let pool;
if (process.env.NODE_ENV === 'test') {
  pool = new Pool({ connectionString: process.env.TESTDB_URL });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL || process.env.LOCALDB_URL,
    ssl: false,
  });
}

const db = {
  query: (text, params) => pool.query(text, params),
};

export default db;

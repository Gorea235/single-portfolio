import { createConnection } from 'mysql';

export function dbConnection() {
  return createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3316,
    user: process.env.DB_USER || 'default',
    password: process.env.DB_PWORD || 'default',
    database: process.env.DB_DB || 'dev'
  });
}

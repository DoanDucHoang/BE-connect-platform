import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

export const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: '',
  database: process.env.database,
  multipleStatements: process.env.multipleStatements,
});

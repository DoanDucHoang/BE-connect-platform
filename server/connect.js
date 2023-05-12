import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

export const db = mysql.createConnection({
  host: "54.179.77.71",
  user: "hoangdoan",
  password: "Duckien.2001",
  database: "vjc-matching",
  multipleStatements: "true",
});

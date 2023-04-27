import mysql from 'mysql';


export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'vjd@2022',
  database: 'vjc-matching',
  multipleStatements: true
});
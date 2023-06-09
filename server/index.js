import express from 'express';
import authRoutes from './routes/auth.js';
import bookingRoutes from './routes/booking.js';
import userRoutes from './routes/user.js';
import profileRoutes from './routes/member.js';
import companyRoutes from './routes/company.js';
import cors from 'cors';
import mysql from 'mysql';
import multer from 'multer';
import dotenv from 'dotenv';
import { generateUploadURL } from './s3.js';
import serverless from 'serverless-http'

const router = express.Router();
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  multipleStatements: process.env.multipleStatements,
});

app.get('/s3Url', async (req, res) => { 
  const url = await generateUploadURL()
  res.send({url})
})

app.use('/server/auth', authRoutes);
app.use('/server/booking', bookingRoutes);
app.use('/server/user', userRoutes);
app.use('/server/profile', profileRoutes);
app.use('/server/getcompany', companyRoutes);
app.use('./netlify/functions/index ', router);

app.listen(8080, () => {
  console.log('Connected to backend!');
});

export default serverless(app);
import express from 'express';
import authRoutes from './routes/auth.js';
import bookingRoutes from './routes/booking.js';
import userRoutes from './routes/user.js';
import profileRoutes from './routes/member.js';
import companyRoutes from './routes/company.js';
import cors from 'cors';
import multer from 'multer';

const app = express();
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../../public/upload');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  res.status(200).json(file);
});

app.use('/server/auth', authRoutes);
app.use('/server/booking', bookingRoutes);
app.use('/server/user', userRoutes);
app.use('/server/profile', profileRoutes);
app.use('/server/getcompany', companyRoutes);
app.listen(8000, () => {
  console.log('Connected to backend!');
});

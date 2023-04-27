import express from 'express';
import { getAllUser } from '../controllers/user.js';
import { getUser } from '../controllers/user.js';

const router = express.Router();

router.get('/getusers', getAllUser);
router.post('/getuser', getUser);

export default router;

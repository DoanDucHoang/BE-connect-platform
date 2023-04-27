import express from 'express';
import { updateProfile } from '../controllers/member.js';

const router = express.Router();

router.post('/updateprofile', updateProfile);

export default router;

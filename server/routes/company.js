import express from 'express';
import { getCompannyProfile } from '../controllers/company.js';
import { getAllCompannyProfile } from '../controllers/company.js';

const router = express.Router();

router.get('/:company_name', getCompannyProfile);
router.get('/', getAllCompannyProfile);

export default router;

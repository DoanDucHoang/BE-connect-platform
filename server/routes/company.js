import express from 'express';
import { getCompannyProfile } from '../controllers/company.js';
import { getAllCompannyProfile } from '../controllers/company.js';
import { getFourCompanyJapan } from '../controllers/company.js';
import { getFourCompanyVietNam } from '../controllers/company.js';
import { getCompanyByName } from '../controllers/company.js';

const router = express.Router();

router.get('/:company_name', getCompannyProfile);
router.get('/', getAllCompannyProfile);
router.post('/searchcompanyname', getCompanyByName);
router.post('/japancompany', getFourCompanyJapan);
router.post('/vietnamcompany', getFourCompanyVietNam);

export default router;

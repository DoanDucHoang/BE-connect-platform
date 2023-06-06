import express from 'express';
import { getCompannyProfile, updateClient, updateInfo, updateCompanyName } from '../controllers/company.js';
import { getAllCompannyProfile } from '../controllers/company.js';
import { getFourCompanyJapan } from '../controllers/company.js';
import { getFourCompanyVietNam } from '../controllers/company.js';
import { getCompanyByName } from '../controllers/company.js';
import { getCompanyByCategory } from '../controllers/company.js';
import { getAllCompannyJapanProfile } from '../controllers/company.js';
import { updateIntroduce } from '../controllers/company.js';
import { updateProduct } from '../controllers/company.js';
import { updateSpecialties } from '../controllers/company.js';
import { updateCoreMember } from '../controllers/company.js';

const router = express.Router();

router.get('/:company_name', getCompannyProfile);
router.get('/', getAllCompannyProfile);
router.post('/allcompanyjapan/pages=', getAllCompannyJapanProfile);
router.post('/searchcompanyname', getCompanyByName);
router.post('/searchcompanycategory', getCompanyByCategory);
router.post('/japancompany', getFourCompanyJapan);
router.post('/vietnamcompany', getFourCompanyVietNam);
router.put('/update_introduce', updateIntroduce);
router.put('/update_product', updateProduct);
router.put('/update_specialties', updateSpecialties);
router.put('/update_core_member', updateCoreMember);
router.put('/update_client', updateClient);
router.put('/update_info', updateInfo);
router.put('/update_company_name', updateCompanyName);

export default router;

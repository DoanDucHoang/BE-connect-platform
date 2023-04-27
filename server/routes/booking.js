import express from 'express';
import { booking } from '../controllers/booking.js';
import { getCompanyBooking } from '../controllers/booking.js';
import { getVietNamBooking } from '../controllers/booking.js';
import { deleteBookingList } from '../controllers/booking.js';

const router = express.Router();

router.post('/', booking);
router.get('/:company_name', getCompanyBooking);
router.get('/vietnam/:company_name', getVietNamBooking);
router.delete('/:id', deleteBookingList);

export default router;

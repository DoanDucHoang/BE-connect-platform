import { db } from '../connect.js';

export const booking = (req, res) => {
  const q =
    'INSERT INTO booking (`company_name_booking`, `company_name_booked`, `slot_booking`, `start_time_booking`, `end_time_booking`) VALUES ?';

  let bookingValues = [];

  for (let index = 0; index < req.body.length; index++) {
    bookingValues = [
      ...bookingValues,
      [
        req.body[index].company_name_booking,
        req.body[index].company_name_booked,
        req.body[index].slot_booking,
        req.body[index].start_time_booking,
        req.body[index].end_time_booking,
      ],
    ];
  }

  db.query(q, [bookingValues], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json('booking successfull!');
  });
};

export const getCompanyBooking = (req, res) => {
  const q =
    'SELECT DISTINCT b.*, a.company_name as company_name_booked, c.company_name_booking FROM user_register as a inner join slot_booking as b left join booking as c on company_name = c.company_name_booked and slot_number = c.slot_booking where company_name = ?';

  db.query(q, [req.params.company_name], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    const { ...others } = data;
    res.status(200).json(others);
  });
};

export const getVietNamBooking = (req, res) => {
  const q =
    'SELECT a.*, b.info_url FROM booking as a left join company_info as b on a.company_name_booked = b.company_name where a.company_name_booking = ?';

  db.query(q, [req.params.company_name], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    const { ...others } = data;
    res.status(200).json(others);
  });
};

export const deleteBookingList = (req, res) => {
  const q = 'DELETE FROM booking WHERE id = ?';

  db.query(q, [req.params.id], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json('Delete successfull');
  });
};

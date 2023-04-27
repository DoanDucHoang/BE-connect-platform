import { db } from '../connect.js';

export const getCompannyProfile = (req, res) => {
  const q =
    'SELECT a.*, b.country FROM company_info as a inner join user_register as b on a.company_name = b.company_name WHERE a.company_name = ?; SELECT * FROM company_description WHERE company_name = ?; SELECT * FROM company_products WHERE company_name = ?; SELECT * FROM company_specialties WHERE company_name = ?; SELECT * FROM company_core_members WHERE company_name = ?; SELECT * FROM company_main_clients WHERE company_name = ?; SELECT DISTINCT b.slot_number as slot_booking, b.start_time_booking, b.end_time_booking, a.company_name as company_name_booked, c.company_name_booking FROM `vjc-matching`.user_register as a inner join `vjc-matching`.slot_booking as b left join `vjc-matching`.booking as c on company_name = c.company_name_booked and c.slot_booking = slot_number where company_name = ?';

  db.query(
    q,
    [
      req.params.company_name,
      req.params.company_name,
      req.params.company_name,
      req.params.company_name,
      req.params.company_name,
      req.params.company_name,
      req.params.company_name,
    ],
    (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      //return res.status(200).json({member_core: data[0], description: data[1]});
      return res.status(200).json({
        company_info: data[0],
        company_description: data[1],
        company_products: data[2],
        company_specialties: data[3],
        company_core_members: data[4],
        company_main_clients: data[5],
        slot_booking: data[6],
      });
    }
  );
};

export const getAllCompannyProfile = (req, res) => {
  const q =
    'SELECT a.*, b.country  FROM company_info as a inner join user_register as b on a.company_name = b.company_name;';

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

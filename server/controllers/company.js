import { db } from '../connect.js';

export const getCompannyProfile = (req, res) => {
  const q =
    'SELECT a.*, b.country, b.id as company_ID FROM company_info as a inner join user_register as b on a.company_name = b.company_name WHERE b.id = ?; SELECT a.*, b.id as company_ID FROM company_description as a inner join user_register as b on a.company_name = b.company_name where b.id = ?; SELECT a.*, b.id as company_ID FROM company_products as a inner join user_register as b on a.company_name = b.company_name WHERE b.id = ?; SELECT a.*, b.id as company_ID FROM company_specialties as a inner join user_register as b on a.company_name = b.company_name WHERE b.id = ?; SELECT a.*, b.id as company_ID FROM company_core_members as a inner join user_register as b on a.company_name = b.company_name WHERE b.id = ?; SELECT a.*, b.id as company_ID FROM company_main_clients as a inner join user_register as b on a.company_name = b.company_name WHERE b.id = ?; SELECT DISTINCT a.id as company_ID, b.slot_number as slot_booking, b.start_time_booking, b.end_time_booking, a.company_name as company_name_booked, c.company_name_booking FROM user_register as a inner join slot_booking as b left join booking as c on company_name = c.company_name_booked and c.slot_booking = slot_number where a.id = ?';

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
        //company_ID: data[0][0].company_ID,
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
    'SELECT a.*, b.country, b.id as company_ID FROM company_info as a inner join user_register as b on a.company_name = b.company_name;';

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

export const getFourCompanyJapan = (req, res) => {
  const q =
    'SELECT a.*, b.country, b.id as company_ID FROM company_info as a inner join user_register as b on a.company_name = b.company_name where b.country = "Japan" ORDER BY b.id asc limit 4;';

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

export const getFourCompanyVietNam = (req, res) => {
  const q =
    'SELECT a.*, b.country, b.id as company_ID FROM company_info as a inner join user_register as b on a.company_name = b.company_name where b.country = "Viet Nam" ORDER BY b.id asc limit 4;';

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

export const getCompanyByName = (req, res) => {
  const q = 'SELECT a.*, b.country, b.id as company_ID FROM company_info as a inner join user_register as b on a.company_name = b.company_name where a.company_name like ?;'

  db.query(q, ['%' + req.body.company_name + '%'], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

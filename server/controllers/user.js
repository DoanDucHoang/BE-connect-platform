import { db } from '../connect.js';

export const getAllUser = (req, res) => {
  const q = 'SELECT * FROM user_register';

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

export const getUser = (req, res) => {
  const q = 'SELECT * FROM user_register WHERE email = ?';

  db.query(q, [req.body.email], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    const { password, phone, ...others } = data[0];
    return res.status(200).json(others);
  });
};

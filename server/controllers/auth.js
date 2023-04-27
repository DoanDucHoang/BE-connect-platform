import { db } from '../connect.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = (req, res) => {
  //check exists user
  const q = 'SELECT * FROM user_register WHERE email = ?';

  db.query(q, [req.body.email], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (data.length) {
      return res.status(409).json('user already exists!');
    }
    //create new user
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      'INSERT INTO user_register (`email`, `password`, `country`, `company_name`, `user_name`, `phone`) VALUES (?)';

    const values = [
      req.body.email,
      hashedPassword,
      req.body.country,
      req.body.company_name,
      req.body.user_name,
      req.body.phone,
    ];

    db.query(q, [values], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json('user has been created!');
    });
  });
};

export const login = (req, res) => {
  const q = 'SELECT * FROM user_register WHERE email = ?';

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json('User not found!');

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword) {
      return res.status(400).json('Wrong password or email');
    }

    const token = jwt.sign({ id: data[0].id }, 'secretkey');
    const { password, phone, ...others } = data[0];

    res
      .cookie('accessToken', token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

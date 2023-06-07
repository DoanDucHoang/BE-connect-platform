import { db } from '../connect.js';
import { QUERY_UPDATE_PROFILE } from '../constant/constant.js';

export const getCompannyProfile = (req, res) => {
  const q =
    'SELECT a.*, b.country, b.id as company_ID FROM company_info as a inner join user_register as b on a.email = b.email WHERE b.id = ?; SELECT a.*, b.id as company_ID FROM company_description as a inner join user_register as b on a.email = b.email where b.id = ?; SELECT a.*, b.id as company_ID FROM company_products as a inner join user_register as b on a.email = b.email WHERE b.id = ?; SELECT a.*, b.id as company_ID FROM company_specialties as a inner join user_register as b on a.email = b.email WHERE b.id = ?; SELECT a.*, b.id as company_ID FROM company_core_members as a inner join user_register as b on a.email = b.email WHERE b.id = ?; SELECT a.*, b.id as company_ID FROM company_main_clients as a inner join user_register as b on a.email = b.email WHERE b.id = ?; SELECT DISTINCT a.id as company_ID, b.slot_number as slot_booking, b.start_time_booking, b.end_time_booking, a.company_name as company_name_booked, c.company_name_booking FROM user_register as a inner join slot_booking as b left join booking as c on company_name = c.company_name_booked and c.slot_booking = slot_number where a.id = ?';

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
    'SELECT a.*, b.country, b.id as company_ID FROM company_info as a inner join user_register as b on a.email = b.email;';

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

export const getAllCompannyJapanProfile = (req, res) => {
   const q =
    'SELECT a.*, b.country, b.id as company_ID FROM company_info as a inner join user_register as b on a.email = b.email where b.country = "japan" limit ?, ?;';

  db.query(q, [req.body.pages, req.body.limit], (err, data) => {
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
  const q = 'SELECT a.*, b.country, b.id as company_ID FROM company_info as a inner join user_register as b on a.email = b.email where a.company_name like ?;'

  db.query(q, ['%' + req.body.company_name + '%'], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

export const getCompanyByCategory = (req, res) => {
  const q = `SELECT a.*, b.country, b.id as company_ID FROM company_info as a inner join user_register as b on a.email = b.email where b.country = "japan" and category = ? limit ?, ?;`

  db.query(q, [req.body.category, req.body.pages, req.body.limit], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

export const updateIntroduce = (req, res) => {
  const q = 'UPDATE `vjc-matching`.company_description SET description = ?, descriptionEN = ?, descriptionJP = ? WHERE email = ?'

  db.query(q, [req.body.description, req.body.descriptionEN, req.body.descriptionJP, req.body.email], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

export const updateProduct = (req, res) => {
  
  for (let index = 0; index < req.body.length; index++) {
    db.query(
      QUERY_UPDATE_PROFILE.QUERY_UPDATE_PRODUCT,
      [
        req.body[index].product_name,
        req.body[index].product_name_EN,
        req.body[index].product_name_JP,
        req.body[index].product_description,
        req.body[index].product_description_EN,
        req.body[index].product_description_JP,
        req.body[index].product_picture,
        req.body[index].product_url,
        req.body[index].id
      ],
      (err, data) => {
        if (err) {
          return res.status(500).json(err);
        } else if (index === req.body.length - 1){ 
          return res.status(200).json(data);
        }
        
      }
    );
  }

};

export const updateSpecialties = (req, res) => {
  
  for (let index = 0; index < req.body.length; index++) {
    db.query(
      QUERY_UPDATE_PROFILE.QUERY_UPDATE_FEATURES,
      [
        req.body[index].speciality_desc,
        req.body[index].speciality_desc_en,
        req.body[index].speciality_desc_jp,
        req.body[index].speciality_picture,
        req.body[index].id
      ],
      (err, data) => {
        if (err) {
          return res.status(500).json(err);
        } else if (index === req.body.length - 1){ 
          return res.status(200).json(data);
        }
        
      }
    );
  }

};

export const updateCoreMember = (req, res) => {
  
  for (let index = 0; index < req.body.length; index++) {
    db.query(
      QUERY_UPDATE_PROFILE.QUERY_UPDATE_CORE_MEMBER,
      [
        req.body[index].member_desc,
        req.body[index].member_desc_EN,
        req.body[index].member_desc_JP,
        req.body[index].member_name,
        req.body[index].member_picture,
        req.body[index].member_position,
        req.body[index].member_position_EN,
        req.body[index].member_position_JP,
        req.body[index].id
      ],
      (err, data) => {
        if (err) {
          return res.status(500).json(err);
        } else if (index === req.body.length - 1){ 
          return res.status(200).json(data);
        }
        
      }
    );
  }

};

export const updateClient = (req, res) => {
  
  for (let index = 0; index < req.body.length; index++) {
    db.query(
      QUERY_UPDATE_PROFILE.QUERY_UPDATE_CLIENT,
      [
        req.body[index].client_name,
        req.body[index].client_logo,
        req.body[index].client_url,
        req.body[index].client_url_EN,
        req.body[index].client_url_JP,
        req.body[index].id
      ],
      (err, data) => {
        if (err) {
          return res.status(500).json(err);
        } else if (index === req.body.length - 1){ 
          return res.status(200).json(data);
        }
        
      }
    );
  }
};

export const updateInfo = (req, res) => {
  
  for (let index = 0; index < req.body.length; index++) {
    db.query(
      QUERY_UPDATE_PROFILE.QUERY_UPDATE_INFO,
      [
        req.body[index].estalishment,
        req.body[index].employers,
        req.body[index].needs_vn,
        req.body[index].needs_en,
        req.body[index].needs_jp,
        req.body[index].company_logo,
        req.body[index].languages,
        req.body[index].category,
        req.body[index].capital,
        req.body[index].address_vn,
        req.body[index].address_en,
        req.body[index].address_jp,
        req.body[index].company_name,
        req.body[index].info_url,
        req.body[index].id
      ],
      (err, data) => {
        if (err) {
          return res.status(500).json(err);
        } else if (index === req.body.length - 1){ 
          return res.status(200).json(data);
        }
        
      }
    );
  }
};

export const updateCompanyName = (req, res) => {
    db.query(
      QUERY_UPDATE_PROFILE.QUERY_UPDATE_COMPANY_NAME,
      [
        req.body.company_name,
        req.body.email,
        req.body.company_name,
        req.body.email,
        req.body.company_name,
        req.body.email,
        req.body.company_name,
        req.body.email,
        req.body.company_name,
        req.body.email,
        req.body.company_name,
        req.body.email,
        req.body.company_name,
        req.body.email,
      ],
      (err, data) => {
        if (err) { 
          return res.status(500).json(err);
        } else { 
          return res.status(200).json(data);
        }
      }
    );
};
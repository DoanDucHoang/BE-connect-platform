import { db } from '../connect.js';
import { QUERY_UPDATE_PROFILE } from '../constant/constant.js';

export const updateProfile = (req, res) => {
  const q = 'SELECT * FROM company_info WHERE company_name = ?';

  let valuesProducts = [];
  let valuesSpecialties = [];
  let valuesCoreMembers = [];
  let valuesMainClients = [];

  let valuesCompanyInfo = [
    [
      req.body[0].email,
      req.body[0].company_name,
      req.body[0].company_logo,
      req.body[0].estalishment,
      req.body[0].employers,
      req.body[0].needs_vn,
      req.body[0].needs_en,
      req.body[0].needs_jp,
      req.body[0].ceategory,
      req.body[0].capital,
      req.body[0].address_vn,
      req.body[0].address_en,
      req.body[0].address_jp,
      req.body[0].languages[0],
      req.body[0].logo_associations,
      req.body[0].info_url,
    ],
  ];

  let valuesDesc = [
    [req.body[1].email, req.body[1].company_name, req.body[1].description, req.body[1].descriptionEN, req.body[1].descriptionJP],
  ];

  for (let index = 0; index < req.body[2].length; index++) {
    valuesProducts = [
      ...valuesProducts,
      [
        req.body[2][index].email,
        req.body[2][index].company_name,
        req.body[2][index].product_name,
        req.body[2][index].product_name_EN,
        req.body[2][index].product_name_JP,
        req.body[2][index].product_description,
        req.body[2][index].product_description_EN,
        req.body[2][index].product_description_JP,
        req.body[2][index].product_picture,
        req.body[2][index].product_url,
      ],
    ];
  }

  for (let index = 0; index < req.body[3].length; index++) {
    valuesSpecialties = [
      ...valuesSpecialties,
      [
        req.body[3][index].email,
        req.body[3][index].company_name,
        req.body[3][index].speciality_picture,
        req.body[3][index].speciality_desc,
        req.body[3][index].speciality_desc_en,
        req.body[3][index].speciality_desc_jp,
      ],
    ];
  }

  for (let index = 0; index < req.body[4].length; index++) {
    valuesCoreMembers = [
      ...valuesCoreMembers,
      [
        req.body[4][index].email,
        req.body[4][index].company_name,
        req.body[4][index].member_name,
        req.body[4][index].member_position,
        req.body[4][index].member_position_EN,
        req.body[4][index].member_position_JP,
        req.body[4][index].member_picture,
        req.body[4][index].member_desc,
        req.body[4][index].member_desc_JP,
        req.body[4][index].member_desc_EN,
      ],
    ];
  }

  for (let index = 0; index < req.body[5].length; index++) {
    valuesMainClients = [
      ...valuesMainClients,
      [
        req.body[5][index].email,
        req.body[5][index].company_name,
        req.body[5][index].client_name,
        req.body[5][index].client_logo,
        req.body[5][index].client_url,
        req.body[5][index].client_url_EN,
        req.body[5][index].client_url_JP,
      ],
    ];
  }

  db.query(q, [req.body[0].company_name], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (data.length) {
      return res.status(409).json('company already exists! update');
    }

    db.query(
      QUERY_UPDATE_PROFILE.QUERY_INFO,
      [valuesCompanyInfo],
      (err, data) => {
        if (err) {
          return res.status(500).json(err);
        }
        
      }
    );

    db.query(QUERY_UPDATE_PROFILE.QUERY_DESC, [valuesDesc], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
    });

    db.query(
      QUERY_UPDATE_PROFILE.QUERY_PRODUCTS,
      [valuesProducts],
      (err, data) => {
        if (err) {
          return res.status(500).json(err);
        }
      }
    );

    db.query(
      QUERY_UPDATE_PROFILE.QUERY_SPECIALTIES,
      [valuesSpecialties],
      (err, data) => {
        if (err) {
          return res.status(500).json(err);
        }
      }
    );

    db.query(
      QUERY_UPDATE_PROFILE.QUERY_CORE_MEMBERS,
      [valuesCoreMembers],
      (err, data) => {
        if (err) {
          return res.status(500).json(err);
        }
      }
    );

    db.query(
      QUERY_UPDATE_PROFILE.QUERY_MAIN_CLIENTS,
      [valuesMainClients],
      (err, data) => {
        if (err) {
          return res.status(500).json(err);
        }
      }
    );

    return res.status(200).json('successfull');
  });
};

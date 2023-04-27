export const QUERY_UPDATE_PROFILE = {
  QUERY_INFO:
    'INSERT INTO company_info (`email`, `company_name`, `company_logo`, `estalishment`, `employers`, `needs`, `category`, `capital`, `address`, `languages`, `logo_associations`, `info_url`) VALUES ?',
  QUERY_DESC:
    'INSERT INTO company_description (`email`, `company_name`, `description`) VALUES ?',
  QUERY_PRODUCTS:
    'INSERT INTO company_products (`email`, `company_name`, `product_name`, `product_description`, `product_picture`, `product_url`) VALUES ?',
  QUERY_SPECIALTIES:
    'INSERT INTO company_specialties (`email`, `company_name`, `speciality_picture`, `speciality_desc`) VALUES ?',
  QUERY_CORE_MEMBERS:
    'INSERT INTO company_core_members (`email`, `company_name`, `member_name`, `member_position`, `member_picture`, `member_desc`) VALUES ?',
  QUERY_MAIN_CLIENTS:
    'INSERT INTO company_main_clients (`email`, `company_name`, `client_name`, `client_logo`, `client_url`) VALUES ?',
};

'use strict';

import DB from '../config/app/query.config.js';
import pgsql from '../config/database/database.config.js';
import logger from '../utility/logger.utility.js';

const GetUserByEmailDTO = async (email, number) => {
  try {
    const query = DB.QUERY.GET_USER_BY_EMAIL;
    const replacements = { email: email ? email : null, mobile_number: number ? number : null }
    const data = await pgsql.query(query, { type: pgsql.QueryTypes.SELECT, replacements: replacements });
    return data;
  } catch (error) {
    logger.error({GetUserByEmailDTO: error.message});
    throw new Error(error.message);
  }
};

const AddNewUserDTO = async (first_name, last_name, email, password, mobile_number) => {
  try {
    const query = DB.QUERY.ADD_NEW_USER;
    const replacements = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      mobile_number: mobile_number,
    };
    const data = await pgsql.query(query, { type: pgsql.QueryTypes.INSERT, replacements: replacements });
    return data;
  } catch (error) {
    logger.error({AddNewUserDTO: error.message});
    throw new Error(error.message);
  }
};
const UserDTO = { GetUserByEmailDTO, AddNewUserDTO };

export default UserDTO;

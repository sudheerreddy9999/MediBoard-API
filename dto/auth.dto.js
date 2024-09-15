'use strict';

import DB from '../config/app/query.config.js';
import pgsql from '../config/database/database.config.js';
import logger from '../utility/logger.utility.js';

const GetUserByEmailDTO = async (email) => {
  try {
    const query = DB.QUERY.GET_USER_BY_EMAIL;
    const replacements = {
      email: email,
    };
    const data = await pgsql.query(query, { type: pgsql.QueryTypes.SELECT, replacements: replacements });
    return data;
  } catch (error) {
    logger.error({GetUserByEmailDTO: error.message});
    throw new Error(error.message);
  }
};

const AddNewUser = async (first_name, last_name, email, password, mobile_number) => {
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
    logger.error({AddNewUser: error.message});
    throw new Error(error.message);
  }
};
const AuthDTO = { GetUserByEmailDTO, AddNewUser };

export default AuthDTO;

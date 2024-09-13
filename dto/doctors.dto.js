'use strict';

import DB from '../config/app/query.config.js';
import pgsql from '../config/database/database.config.js';
import logger from '../utility/logger.utility.js';

const GETDOCTORS = async (email, mobile_number) => {
  try {
    const query = DB.QUERY.GET_DOCTORS;
    const replacements = { email: email ? email : null, mobile_number: mobile_number ? mobile_number : null };

    const data = await pgsql.query(query, { replacements, type: pgsql.QueryTypes.SELECT });
    return data;
  } catch (error) {
    console.log(error);
    logger.error(error.message);
    throw new Error(error.message);
  }
};

const AddDoctorDTO = async (name, dob, email, specialization, mobile_number, password, created_by) => {
  try {
    const query = DB.QUERY.POST_DOCTOR;
    const replacements = { name, dob, email, specialization, mobile_number, password, created_by };
    const data = await pgsql.query(query, { replacements, type: pgsql.QueryTypes.INSERT });
    return data;
  } catch (error) {
    logger.error({ AddDoctorDTO: error.message });
    throw new Error(error.message);
  }
};
const DoctorsDto = { GETDOCTORS, AddDoctorDTO };

export default DoctorsDto;

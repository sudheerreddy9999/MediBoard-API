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
    logger.error({ GETDOCTORS: error.message });
    throw new Error(error.message);
  }
};

const GetAllDoctorsDTO = async () => {
  try {
    const query = DB.QUERY.GET_ALLDOCTORS;
    const data = await pgsql.query(query, { type: pgsql.QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ GetAllDoctorsDTO: error.message });
    throw new Error(error.message);
  }
};

const GetDoctroByIdDTO = async (doctor_id) => {
  try {
    const query = DB.QUERY.GET_DOCTOR_BY_ID;
    const replacements = { doctor_id };
    const data = await pgsql.query(query, { replacements, type: pgsql.QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ GetDoctroByIdDTO: error.message });
    throw new Error(error.message);
  }
};

const AddDoctorDTO = async (name, image, image_ext, dob, email, specialization, mobile_number, password, created_by, description) => {
  try {
    const query = DB.QUERY.POST_DOCTOR;
    const replacements = { name, image,image_ext, dob, email, specialization, mobile_number, password, created_by , description};
    const data = await pgsql.query(query, { replacements, type: pgsql.QueryTypes.INSERT });
    return data;
  } catch (error) {
    logger.error({ AddDoctorDTO: error.message });
    throw new Error(error.message);
  }
};
const DoctorsDto = { GETDOCTORS, AddDoctorDTO, GetAllDoctorsDTO, GetDoctroByIdDTO };

export default DoctorsDto;

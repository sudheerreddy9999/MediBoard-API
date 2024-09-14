'use strict';
import DB from '../config/app/query.config.js';
import logger from '../utility/logger.utility.js';
import pgsql from '../config/database/database.config.js';

const GetAvilableSlotsByDoctorIdDTO = async (doctorId) => {
  try {
    const query = DB.QUERY.GET_AVILABLE_SLOTS_BY_DOCTOR_ID;
    const replacements = { doctorId };
    const data = await pgsql.query(query, { replacements, type: pgsql.QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ GetAvilableSlotsByDoctorIdDTO: error.message });
    throw new Error(error.message);
  }
};

const SlotsDTO = { GetAvilableSlotsByDoctorIdDTO };

export default SlotsDTO;

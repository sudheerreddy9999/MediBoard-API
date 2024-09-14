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

const CheckSlotConflictDTO = async (doctor_id, slot_date, slot_time, slot_end_time) => {
  try {
    const query = DB.QUERY.CHECK_SLOT_CONFLICT;
    const replacements = { doctor_id, slot_date, slot_time, slot_end_time };
    const data = await pgsql.query(query, { replacements, type: pgsql.QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ CheckSlotConflictDTO: error.message });
    throw new Error(error.message);
  }
};

const CreateSlotsDTO = async (doctor_id, available_slots, slot_date, slot_time, slot_end_time, created_by) => {
  try {
    const query = DB.QUERY.POST_SLOT;
    const replacements = { doctor_id, available_slots, slot_date, slot_time, slot_end_time, created_by };
    const data = await pgsql.query(query, { replacements, type: pgsql.QueryTypes.INSERT });
    return data;
  } catch (error) {
    logger.error({ CreateSlotsDTO: error.message });
    throw new Error(error.message);
  }
};

const SlotsDTO = { GetAvilableSlotsByDoctorIdDTO, CheckSlotConflictDTO, CreateSlotsDTO };

export default SlotsDTO;

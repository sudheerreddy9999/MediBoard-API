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

const GetAllSlotsByDoctorIdDTO = async (doctor_id) => {
  try {
    const query = DB.QUERY.GET_SLOTS_BY_DOCTOR_ID;
    const replacements = {doctor_id};
    const data = await pgsql.query(query, { replacements, type: pgsql.QueryTypes.SELECT});
    return data;
  } catch (error) {
    logger.error({ GetAllSlotsByDoctorIdDTO: error.message });
    throw new Error(error.message);
  }
}

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

const CheckSlotConflictExceptBySLotIdDTO = async (doctor_id, slot_date, slot_time, slot_end_time, slot_id) => {
  try {
    const query = DB.QUERY.CHECK_SLOT_CONFLICT_EXCEPT_SLOT_ID;
    const replacements = { doctor_id, slot_date, slot_time, slot_end_time, slot_id };
    const data = await pgsql.query(query, { replacements, type: pgsql.QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ CheckSlotConflictDTO: error.message });
    throw new Error(error.message);
  }
};

const GetSlotBySlotIdDTO = async (slot_id) => {
  try {
    const query = DB.QUERY.GET_SLOTS_BY_ID;
    const replacements = { slot_id };
    const data = await pgsql.query(query, { replacements, type: pgsql.QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ GetSlotBySlotIdDTO: error.message });
    throw new Error(error.message);
  }
};

const CreateSlotsDTO = async (description, title, doctor_id, available_slots, slot_date, slot_time, slot_end_time, created_by) => {
  try {
    const query = DB.QUERY.POST_SLOT;
    const replacements = { description, title, doctor_id, available_slots, slot_date, slot_time, slot_end_time, created_by };
    const data = await pgsql.query(query, { replacements, type: pgsql.QueryTypes.INSERT });
    return data;
  } catch (error) {
    logger.error({ CreateSlotsDTO: error.message });
    throw new Error(error.message);
  }
};

const UpdateSlotsDTO = async (slot_id,description, title, available_slots, slot_date, slot_time, slot_end_time, updated_by) => {
  try {
    const query = DB.QUERY.UPDATE_SLOT;
    const replacements = { slot_id,description, title, available_slots, slot_date, slot_time, slot_end_time, updated_by };
    const data = await pgsql.query(query, { replacements, type: pgsql.QueryTypes.UPDATE });
    return data;
  } catch (error) {
    logger.error({ UpdateSlotsDTO: error.message });
    throw new Error(error.message);
  }
};

const UpdateBookedSlotsDTO = async (slot_id, booked_slots) => {
  try {
    const query = DB.QUERY.UPDATE_BOOKED_SLOTS;
    const replacements = { slot_id, booked_slots };
    const data = await pgsql.query(query, { replacements, type: pgsql.QueryTypes.UPDATE });
    return data;
  } catch (error) {
    logger.error({ UpdateBookedSlotsDTO: error.message });
    throw new Error(error.message);
  }
};

const SlotsDTO = {
  GetAvilableSlotsByDoctorIdDTO,
  CheckSlotConflictDTO,
  CreateSlotsDTO,
  GetSlotBySlotIdDTO,
  UpdateBookedSlotsDTO,
  GetAllSlotsByDoctorIdDTO,
  UpdateSlotsDTO,
  CheckSlotConflictExceptBySLotIdDTO
};

export default SlotsDTO;

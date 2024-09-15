'use strict';
import DB from '../config/app/query.config.js';
import pgsql from '../config/database/database.config.js';
import logger from '../utility/logger.utility.js';

const PostNewAppointment = async (user_id, name, mobile_number, email, slot_id, created_by, status, is_emergency) => {
  try {
    const query = DB.QUERY.POST_APPOINTMENT;
    const replacements = {
      user_id: user_id ? user_id : null,
      name: name,
      mobile_number: mobile_number,
      email: email,
      slot_id: slot_id,
      created_by: created_by ? created_by : 'guest',
      status: status,
      is_emergency: is_emergency ? is_emergency : 'N',
    };
    const data = await pgsql.query(query, { type: pgsql.QueryTypes.INSERT, replacements: replacements });
    return data;
  } catch (error) {
    logger.error({ PostNewAppointment: error.message });
    throw new Error(error.message);
  }
};

const DeleteAppointementDTO = async (appointment_id) => {
  try {
    const query = DB.QUERY.DELETE_APPOINTEMENT;
    const replacements = { appointment_id };

    const data = pgsql.query(query, { replacements, type: pgsql.QueryTypes.DELETE });
    return data;
  } catch (error) {
    logger.error({ DeleteAppointementDTO: error.message });
    throw new Error(error.message);
  }
};

const GetCurreAppointmentsForUserDTO = async (mobile_number, email) => {
  try {
    const query = DB.QUERY.GET_APPOINTMENTS_FOR_USER__CURRENTDATE;
    const replacements = {
      mobile_number: mobile_number ? mobile_number : null,
      email: email ? email : null,
    };
    const data = await pgsql.query(query, { replacements, type: pgsql.QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ GetCurreAppointmentsForUserDTO: error.message });
    throw new Error(error.message);
  }
};

const GetAppointmentsByDateDTO = async (created_date) => {
  try {
    const query = DB.QUERY.GET_APPOINTMENTS_BY_DATE;
    const replacements = {
      created_date,
    };
    const data = await pgsql.query(query, { replacements, type: pgsql.QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ GetAppointmentsByDateDTO: error.message });
    throw new Error(error.message);
  }
};

const AppointmentsDto = { PostNewAppointment, DeleteAppointementDTO, GetCurreAppointmentsForUserDTO, GetAppointmentsByDateDTO };

export default AppointmentsDto;

'use strict'
import DB from '../config/app/query.config.js';
import pgsql from '../config/database/database.config.js';

const PostNewAppointment = async (
  user_id,
  name,
  mobile_number,
  email,
  date,
  slot_time,
  created_by,
  created_date,
  department,
  doctor_name,
) => {
  try {
    const query = DB.QUERY.POST_APPOINTMENT;
    const replacements = {
      user_id: user_id?user_id:null,
      name: name,
      mobile_number: mobile_number,
      email: email,
      date: date,
      slot_time: slot_time,
      created_by: created_by?created_by:'guest',
      department: department,
      doctor_name: doctor_name,
    };
    const data = await pgsql.query(query, { type: pgsql.QueryTypes.INSERT, replacements: replacements });
    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

const AppointmentsDto = { PostNewAppointment };

export default AppointmentsDto;

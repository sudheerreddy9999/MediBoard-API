'use strict';

import AppointmentsDto from '../dto/appointments.dto.js';


const PostAppointmentServive = async (request) => {
  try {
    const user_id = request.userId;
    const created_by = request.userId?request.userId:request.employee_id ;
    const { name, mobile_number, email, date, slot_time,created_date, department, doctor_name } =
      request.body;
    const data = await AppointmentsDto.PostNewAppointment(
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
    );
    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

const AppointmentsService = { PostAppointmentServive };

export default AppointmentsService;

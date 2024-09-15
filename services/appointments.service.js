'use strict';

import AppointmentsDto from '../dto/appointments.dto.js';
import SlotsDTO from '../dto/slots.dto.js';
import customUtility from '../utility/custom.utility.js';
import logger from '../utility/logger.utility.js';

const { customExceptionMessage } = customUtility;

const PostAppointmentServive = async (request) => {
  let appointment_id;
  try {
    const created_by = request.userId ? request.userId : request.employee_id;
    let { user_id, name, mobile_number, email, slot_id, is_emergency } = request.body;
    user_id = request.userId;
    if (!user_id) {
      const userAppointments = await AppointmentsDto.GetCurrentAppointmentsForUserDTO(mobile_number, email);
      if (userAppointments.length > 0) {
        return customExceptionMessage(409, 'appointment already booked with mobile or email for today date');
      }
    }
    const status = 'booked';
    const isSlotAvilable = await SlotsDTO.GetSlotBySlotIdDTO(slot_id);
    if (isSlotAvilable.length === 0) {
      return customExceptionMessage(404, 'Please select valid slot or slot unavilable');
    }
    if (isSlotAvilable[0].booked_slots >= isSlotAvilable[0].available_slots) {
      return customExceptionMessage(409, 'Please select another slot or current slot is unavilable or full');
    }
    const [data] = await AppointmentsDto.PostNewAppointment(
      user_id,
      name,
      mobile_number,
      email,
      slot_id,
      created_by,
      status,
      is_emergency,
    );
    appointment_id = data[0].appointment_id;
    if (data) {
      const booked_slots = isSlotAvilable[0].booked_slots + 1;
      await SlotsDTO.UpdateBookedSlotsDTO(slot_id, booked_slots);
    }
    return data;
  } catch (error) {
    await AppointmentsDto.DeleteAppointementDTO(appointment_id);
    logger.error({ PostAppointmentServive: error.message });
    throw new Error(error.message);
  }
};

const GetAppointmentsByDateService = async (request) => {
  try {
    const { created_date } = request.headers;
    const role = request.role;
    if (!role) {
      return customExceptionMessage(401, 'you are not authorized to ');
    }
    const data = await AppointmentsDto.GetAppointmentsByDateDTO(created_date);
    return data;
  } catch (error) {
    logger.error({ GetAppointmentsByDateService: error.message });
    throw new Error(error.message);
  }
};

const GetCurrentAppointmentQueueService = async (request) => {
  try {
    const { doctor_id } = request.headers;
    const data = await AppointmentsDto.GetCurrentAppointmentQueueDTO(doctor_id);
    return data;
  } catch (error) {
    logger.error({ GetCurrentAppointmentQueueService: error.message });
    throw new Error(error.message);
  }
};

const GetAppointmentByIdService = async (request) => {
  try {
    const { appointment_id } = request.headers;
    const data = await AppointmentsDto.GetAppointmentByIdDTO(appointment_id);
    return data;
  } catch (error) {
    logger.error({ GetAppointmentByIdService: error.message });
    throw new Error(error.message);
  }
};

const UpdateAppointmentCompletedStatusService = async (request) => {
  try {
    const { appointment_id } = request.headers;
    const role = request.role;
    if (!role) {
      return customExceptionMessage(401, 'you are not authorized to ');
    }
    const appointment = await AppointmentsDto.GetAppointmentByIdDTO(appointment_id)
    if(appointment.length === 0){
      return customExceptionMessage(404, 'appointment not found')
    }
    const data = await AppointmentsDto.UpdateAppointmentStatusDTO(appointment_id, 'completed');
    return data;
  } catch (error) {
    logger.error({ UpdateAppointmentCompletedStatusService: error.message });
    throw new Error(error.message);
  }
};

const UpdateAppointmentCancelStatusService = async (request) => {
  try {
    const { appointment_id } = request.headers;
    const role = request.role;
    if (!role) {
      return customExceptionMessage(401, 'you are not authorized to ');
    }
    const appointment = await AppointmentsDto.GetAppointmentByIdDTO(appointment_id)
    if(appointment.length === 0){
      return customExceptionMessage(404, 'appointment not found')
    }
    const data = await AppointmentsDto.UpdateAppointmentStatusDTO(appointment_id, 'cancel');
    return data;
  } catch (error) {
    logger.error({ UpdateAppointmentCancelStatusService: error.message });
    throw new Error(error.message);
  }
};

const UpdateAppointmentTestStatusService = async (request) => {
  try {
    const { appointment_id } = request.headers;
    const role = request.role;
    if (!role) {
      return customExceptionMessage(401, 'you are not authorized to ');
    }
    const appointment = await AppointmentsDto.GetAppointmentByIdDTO(appointment_id)
    if(appointment.length === 0){
      return customExceptionMessage(404, 'appointment not found')
    }
    const data = await AppointmentsDto.UpdateAppointmentTestStatusDTO(appointment_id);
    return data;
  } catch (error) {
    logger.error({ UpdateAppointmentTestStatusService: error.message });
    throw new Error(error.message);
  }
};

const AppointmentsService = {
  PostAppointmentServive,
  GetAppointmentsByDateService,
  GetCurrentAppointmentQueueService,
  UpdateAppointmentCompletedStatusService,
  UpdateAppointmentCancelStatusService,
  UpdateAppointmentTestStatusService,
  GetAppointmentByIdService,
};

export default AppointmentsService;

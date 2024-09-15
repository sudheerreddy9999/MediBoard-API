'use strict';

import AppointmentsService from '../services/appointments.service.js';
import logger from '../utility/logger.utility.js';

const AddAppointmentController = async (request, response) => {
  try {
    const data = await AppointmentsService.PostAppointmentServive(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: 'Appointement booked sucessfully' });
    }
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};

const GetAppointmentsByDateController = async (request, response) => {
  try {
    const data = await AppointmentsService.GetAppointmentsByDateService(request);
    return response.status(200).json({ message: 'Okay request sucessfull', appointments: data });
  } catch (error) {
    logger.error(error.message);
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};

const GetCurrentAppointmentQueueController = async (request, response) => {
  try {
    const data = await AppointmentsService.GetCurrentAppointmentQueueService(request);
    return response.status(200).json({ message: 'Okay request sucessfull', appointmentsCurrentQueue: data });
  } catch (error) {
    logger.error({ GetCurrentAppointmentQueueController: error.message });
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};

const AppointmentsController = { AddAppointmentController, GetAppointmentsByDateController, GetCurrentAppointmentQueueController };
export default AppointmentsController;

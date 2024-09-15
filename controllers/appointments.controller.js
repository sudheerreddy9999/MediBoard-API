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
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: 'Okay request sucessfull', appointments: data });
    }
  } catch (error) {
    logger.error(error.message);
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};

const GetAppointmentByIdController = async (request, response) => {
  try {
    const data = await AppointmentsService.GetAppointmentByIdService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: 'Okay request sucessfull', appointment: data});
    }
  } catch (error) {
    logger.error({ GetAppointmentByIdController: error.message });
    return response.status(500).json({ message: 'Internal Server Error' });
  }
}

const GetCurrentAppointmentQueueController = async (request, response) => {
  try {
    const data = await AppointmentsService.GetCurrentAppointmentQueueService(request);
    return response.status(200).json({ message: 'Okay request sucessfull', appointmentsCurrentQueue: data });
  } catch (error) {
    logger.error({ GetCurrentAppointmentQueueController: error.message });
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};

const UpdateAppointmentCompletedStatusController = async (request, response) => {
  try {
    const data = await AppointmentsService.UpdateAppointmentCompletedStatusService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: 'Okay request sucessfull' });
    }
  } catch (error) {
    logger.error({ UpdateAppointmentCompletedStatusController: error.message });
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};

const UpdateAppointmentCancelStatusController = async (request, response) => {
  try {
    const data = await AppointmentsService.UpdateAppointmentCancelStatusService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: 'Okay request sucessfull' });
    }
  } catch (error) {
    logger.error({ UpdateAppointmentCancelStatusController: error.message });
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};

const UpdateAppointmentTestStatusController = async (request, response) => {
  try {
    const data = await AppointmentsService.UpdateAppointmentTestStatusService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: 'Okay request sucessfull' });
    }
  } catch (error) {
    logger.error({ UpdateAppointmentTestStatusController: error.message });
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};

const AppointmentsController = {
  AddAppointmentController,
  GetAppointmentsByDateController,
  GetCurrentAppointmentQueueController,
  UpdateAppointmentCancelStatusController,
  UpdateAppointmentCompletedStatusController,
  UpdateAppointmentTestStatusController,
  GetAppointmentByIdController
};
export default AppointmentsController;

'use strict';

import SlotsService from '../services/slots.service.js';
import logger from '../utility/logger.utility.js';

const GetAvilableSlotsByDoctorIdController = async (request, response) => {
  try {
    const data = await SlotsService.GetAvilableSlotsByDoctorIdService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    }
    return response.status(200).json({ message: 'Okay request sucessfull', slots: data });
  } catch (error) {
    logger.error({ GetAvilableSlotsByDoctorIdController: error.message });
    return response.status(500).json({ message: 'Internal server error' });
  }
};

const GetAllSlotsByDoctorIdController = async (request, response) => {
  try {
    const data = await SlotsService.GetAllSlotsByDoctorIdService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    }
    return response.status(200).json({ message: 'Okay request sucessfull', slots: data });
  } catch (error) {
    logger.error({ GetAllSlotsByDoctorIdController: error.message });
    return response.status(500).json({ message: 'Internal server error' });
  }
};

const CreateSlotsController = async (request, response) => {
  try {
    const data = await SlotsService.CreateSlotsService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: 'Okay request sucessfull', slots: data });
    }
  } catch (error) {
    logger.error({ CreateSlotsController: error.message });
    return response.status(500).json({ message: 'Internal server error' });
  }
};

const SlotsController = { GetAvilableSlotsByDoctorIdController, CreateSlotsController };

export default SlotsController;

'use strict';

import SlotsService from '../services/slots.service.js';
import logger from '../utility/logger.utility.js';

const GetAvilableSlotsByDoctorIdController = async (request, response) => {
  try {
    const data = await SlotsService.GetAvilableSlotsByDoctorIdService(request);
    return response.status(200).json({ message: 'Okay request sucessfull', slots: data });
  } catch (error) {
    logger.error({ GetAvilableSlotsByDoctorIdController: error.message });
    return response.status(500).json({ message: 'Internal server error' });
  }
};

const SlotsController = { GetAvilableSlotsByDoctorIdController };

export default SlotsController;

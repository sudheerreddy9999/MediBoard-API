'use strict';

import DoctorsService from '../services/doctors.service.js';
import logger from '../utility/logger.utility.js';

const GetDoctorAuthControllers = async (request, response) => {
  try {
    const doctorsData = await DoctorsService.GetDoctorsService(request);
    if (doctorsData.errorCode) {
      return response.status(doctorsData.errorCode).json({ message: doctorsData.errorMessage });
    } else {
      return response.status(200).json({ message: 'Doctor Login sucessfull', doctorsData });
    }
  } catch (error) {
    logger.error({ GetDoctorAuthControllers: error.message });
    return response.status(500).json({ message: 'Internal server Error' });
  }
};

const PostDoctorController = async (request, response) => {
  try {
    const data = await DoctorsService.PostDoctorService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: 'Doctor Added sucessfull' });
    }
  } catch (error) {
    logger.error({ PostDoctorController: error.message });
    return response.status(500).json({ message: 'Internal server error' });
  }
};

const DoctorsControllers = { GetDoctorAuthControllers, PostDoctorController };

export default DoctorsControllers;

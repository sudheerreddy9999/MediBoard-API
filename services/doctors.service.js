'use strict';

import DoctorsDto from '../dto/doctors.dto.js';
import customUtility from '../utility/custom.utility.js';
const { customExceptionMessage } = customUtility;

const GetDoctorsService = async () => {
  try {
    const data = await DoctorsDto.GETDOCTORS();
    if (data.length === 0) {
      return customExceptionMessage(401, 'No Doctors are present');
    } else {
      return data;
    }
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

const DoctorsService = { GetDoctorsService };

export default DoctorsService;

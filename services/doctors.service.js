'use strict';

import DoctorsDto from '../dto/doctors.dto.js';
import JWT from '../middlewares/jwt.middleware.js';
import customUtility from '../utility/custom.utility.js';
import logger from '../utility/logger.utility.js';
import bcrypt from 'bcrypt';
const { customExceptionMessage } = customUtility;

const GetDoctorsService = async (request) => {
  try {
    const { email, password } = request.headers;
    const data = await DoctorsDto.GETDOCTORS(email);
    if (data.length === 0) {
      return customExceptionMessage(401, 'No Doctors are present');
    } else {
      const isPasswordEqual = bcrypt.compare(password, data[0].password);
      if (!isPasswordEqual) {
        return customExceptionMessage(401, 'Invalid Password');
      }
      const doctorData = {
        doctor_id: data[0].doctor_id,
        name: data[0].name,
        email: data[0].email,
        mobile_number: data[0].mobile_number,
        age: data[0].age,
        dob: data[0].dob,
        specialization: data[0].specialization,
      };
      const token = JWT.GenerateToken(doctorData);
      return { token, doctorData };
    }
  } catch (error) {
    logger.error(error.message);
    throw new Error(error.message);
  }
};

const GetAllDoctorsService = async () => {
  try {
    const data = await DoctorsDto.GetAllDoctorsDTO();
    console.log(data[0])
    const doctorData =data.map(data => { return {
      doctor_id: data.doctor_id,
      image: data.image ? data.image.toString('base64'): null,
      image_ext: data.image_ext,
      name: data.name,
      email: data.email,
      mobile_number: data.mobile_number,
      age: data.age,
      dob: data.dob,
      specialization: data.specialization,
      description: data.description,
    };})
    return doctorData;
  } catch (error) {
    logger.error({ GetAllDoctorsService: error.message });
    throw new Error(error.message);
  }
};

const PostDoctorService = async (request) => {
  try {
    const created_by = request.employee_id;
    const { name, dob, email, specialization, mobile_number, password } = request.body;
    const image = request.file.buffer;
    const fileName = request.file.originalname.split('.').pop();
    const userRole = request.role;
    if (userRole !== 'admin') {
      return customExceptionMessage(401, 'Not Authorized add Doctor');
    }
    const doctorByEmail = await DoctorsDto.GETDOCTORS(email, null);
    if (doctorByEmail.length > 0) {
      return customExceptionMessage(409, 'Doctor already exists with email');
    }
    const doctorByMobile = await DoctorsDto.GETDOCTORS(null, mobile_number);
    if (doctorByMobile.length > 0) {
      return customExceptionMessage(409, 'Doctor already exists with mobile number');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await DoctorsDto.AddDoctorDTO(
      name,
      image,
      fileName,
      dob,
      email,
      specialization,
      mobile_number,
      hashedPassword,
      created_by,
    );
    return result;
  } catch (error) {
    logger.error({ PostDoctorService: error.message });
    throw new Error(error.message);
  }
};

const DoctorsService = { GetDoctorsService, PostDoctorService,GetAllDoctorsService };

export default DoctorsService;

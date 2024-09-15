import DoctorsDto from '../dto/doctors.dto.js';
import SlotsDTO from '../dto/slots.dto.js';
import customUtility from '../utility/custom.utility.js';
import logger from '../utility/logger.utility.js';

const { customExceptionMessage } = customUtility;

const GetAvilableSlotsByDoctorIdService = async (request) => {
  try {
    const { doctor_id } = request.headers;

    const doctorData = await DoctorsDto.GetDoctroByIdDTO(doctor_id);
    if (doctorData.length === 0) {
      return customExceptionMessage(404, 'Doctor not found with given id');
    }
    const data = await SlotsDTO.GetAvilableSlotsByDoctorIdDTO(doctor_id);
    return data;
  } catch (error) {
    logger.error({ GetAvilableSlotsByDoctorIdService: error.message });
    throw new Error(error.message);
  }
};

const GetAllSlotsByDoctorIdService = async (request) => {
  try {
    const { doctor_id } = request.headers;

    const doctorData = await SlotsDTO.GetAllSlotsByDoctorIdDTO(doctor_id);
    if (doctorData.length === 0) {
      return customExceptionMessage(404, 'Doctor not found with given id');
    }
    const data = await SlotsDTO.GetAllSlotsByDoctorIdDTO(doctor_id);
    return data;
  } catch (error) {
    logger.error({ GetAllSlotsByDoctorIdService: error.message });
    throw new Error(error.message);
  }
};

const CreateSlotsService = async (request) => {
  try {
    const created_by = request.employee_id;
    const {description, title, doctor_id, available_slots, slot_date, slot_time, slot_end_time } = request.body;

    const doctorData = await DoctorsDto.GetDoctroByIdDTO(doctor_id);
    if (doctorData.length === 0) {
      return customExceptionMessage(404, 'Doctor not found with given id');
    }
    const slotData = await SlotsDTO.CheckSlotConflictDTO(doctor_id, slot_date, slot_time, slot_end_time);
    if (slotData.length > 0) {
      return customExceptionMessage(409, 'slot already booked');
    }
    const data = await SlotsDTO.CreateSlotsDTO(
      description, title,
      doctor_id,
      available_slots,
      slot_date,
      slot_time,
      slot_end_time,
      created_by,
    );
    return data;
  } catch (error) {
    logger.error({ CreateSlotsService: error.message });
    throw new Error(error.message);
  }
};

const SlotsService = { GetAvilableSlotsByDoctorIdService, CreateSlotsService, GetAllSlotsByDoctorIdService };

export default SlotsService;

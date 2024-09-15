import DoctorsDto from '../dto/doctors.dto.js';
import SlotsDTO from '../dto/slots.dto.js';
import customUtility from '../utility/custom.utility.js';
import logger from '../utility/logger.utility.js';

const { customExceptionMessage, formatDateTime } = customUtility;

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
    const role = request.role;
    if (!role) {
      return customExceptionMessage(401, 'you are not authorized to ');
    }
    const doctorData = await DoctorsDto.GetDoctroByIdDTO(doctor_id);
    if (doctorData.length === 0) {
      return customExceptionMessage(404, 'Doctor not found with given id');
    }
    const data = await SlotsDTO.GetAllSlotsByDoctorIdDTO(doctor_id);
    const formatedData = data.map((d) => {
      const startDate = formatDateTime(d.slot_date, d.slot_time);
      const endDate = formatDateTime(d.slot_date, d.slot_end_time);
      return {
        title: d.title,
        description: d.description,
        start: startDate,
        end: endDate,
      };
    });
    return formatedData;
  } catch (error) {
    logger.error({ GetAllSlotsByDoctorIdService: error.message });
    throw new Error(error.message);
  }
};

const CreateSlotsService = async (request) => {
  try {
    const created_by = request.employee_id;
    const { description, title, doctor_id, available_slots, slot_date, slot_time, slot_end_time } = request.body;
    const role = request.role;
    if (!role) {
      return customExceptionMessage(401, 'you are not authorized to ');
    }
    const doctorData = await DoctorsDto.GetDoctroByIdDTO(doctor_id);
    if (doctorData.length === 0) {
      return customExceptionMessage(404, 'Doctor not found with given id');
    }
    const slotData = await SlotsDTO.CheckSlotConflictDTO(doctor_id, slot_date, slot_time, slot_end_time);
    if (slotData.length > 0) {
      return customExceptionMessage(409, 'slot already booked');
    }
    const data = await SlotsDTO.CreateSlotsDTO(
      description,
      title,
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

const UpdateSlotsService = async (request) => {
  try {
    const updated_by = request.employee_id;
    const { slot_id, description, title, available_slots, slot_date, slot_time, slot_end_time } = request.body;
    const role = request.role;
    if (!role) {
      return customExceptionMessage(401, 'you are not authorized to ');
    }
    const slot = await SlotsDTO.GetSlotBySlotIdDTO(slot_id);
    if (slot.length === 0) {
      return customExceptionMessage(404, 'slot not found with given id');
    }
    const doctor_id = slot[0].doctor_id;
    const slotData = await SlotsDTO.CheckSlotConflictExceptBySLotIdDTO(doctor_id, slot_date, slot_time, slot_end_time, slot_id);
    console.log(slotData)
    if (slotData.length > 0) {
      return customExceptionMessage(409, 'slot already booked');
    }
    const data = await SlotsDTO.UpdateSlotsDTO(
      slot_id,
      description,
      title,
      available_slots,
      slot_date,
      slot_time,
      slot_end_time,
      updated_by,
    );
    return data;
  } catch (error) {
    logger.error({ UpdateSlotsService: error.message });
    throw new Error(error.message);
  }
};

const SlotsService = {
  GetAvilableSlotsByDoctorIdService,
  CreateSlotsService,
  GetAllSlotsByDoctorIdService,
  UpdateSlotsService,
};

export default SlotsService;

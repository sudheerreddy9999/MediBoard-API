import SlotsDTO from '../dto/slots.dto.js';
import logger from '../utility/logger.utility.js';

const GetAvilableSlotsByDoctorIdService = async (request) => {
  try {
    const { doctor_id } = request.headers;
    const data = await SlotsDTO.GetAvilableSlotsByDoctorIdDTO(doctor_id);
    return data;
  } catch (error) {
    logger.error({ GetAvilableSlotsByDoctorIdService: error.message });
    throw new Error(error.message);
  }
};

const SlotsService = { GetAvilableSlotsByDoctorIdService };

export default SlotsService;

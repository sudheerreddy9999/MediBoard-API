'use strict';
import properties from '../index.config.js';

const QUERY = {
  GET_USER_BY_EMAIL: properties.get('query.get_userbyemail'),
  POST_APPOINTMENT: properties.get('query.post_appointment'),
  GET_EMPLOYEE_EMAIL: properties.get('query.get_employee_email'),
  ADD_NEW_EMPLOYEE: properties.get('query.post_newemployee'),
  ADD_NEW_USER: properties.get('query.post_newuser'),
  GET_DOCTORS: properties.get('query.get_doctors'),
  POST_DOCTOR: properties.get('query.post_doctor'),
  GET_ALLDOCTORS: properties.get('query.get_all_doctors'),
  GET_AVILABLE_SLOTS_BY_DOCTOR_ID: properties.get('query.get_avilable_slots_by_doctor_id'),
  CHECK_SLOT_CONFLICT: properties.get('query.check_slot_conflict'),
  POST_SLOT: properties.get('query.post_slot'),
  GET_SLOTS_BY_ID: properties.get('query.get_slots_by_id'),
  GET_DOCTOR_BY_ID: properties.get('query.get_doctor_by_id'),
  UPDATE_BOOKED_SLOTS: properties.get('query.update_booked_slots'),
  DELETE_APPOINTEMENT: properties.get('query.delete_appointement'),
  GET_APPOINTMENTS_BY_DATE: properties.get('query.get_appointments_by_date'),
  GET_APPOINTMENTS_FOR_USER__CURRENTDATE: properties.get('query.get_appointments_for_user__currentdate'),
  GET_CURRENT_APPOINTMENT_QUEUE: properties.get('query.get_current_appointment_queue'),
};

const DB = { QUERY };
export default DB;

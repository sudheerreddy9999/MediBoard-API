'use strict';
import properties from '../index.config.js';

const QUERY = {
  //user
  GET_USER_BY_EMAIL: properties.get('query.get_userbyemail'),
  GET_USERBY_ID: properties.get('query.get_userby_id'),
  ADD_NEW_USER: properties.get('query.post_newuser'),
  UPDATE_USER: properties.get('query.update_user'),
  CHANGE_USER_PASSWORD: properties.get('query.change_user_password'),
  //employee
  GET_EMPLOYEE_EMAIL: properties.get('query.get_employee_email'),
  ADD_NEW_EMPLOYEE: properties.get('query.post_newemployee'),
  //doctors
  GET_DOCTORS: properties.get('query.get_doctors'),
  POST_DOCTOR: properties.get('query.post_doctor'),
  GET_ALLDOCTORS: properties.get('query.get_all_doctors'),
  //slots
  GET_AVILABLE_SLOTS_BY_DOCTOR_ID: properties.get('query.get_avilable_slots_by_doctor_id'),
  CHECK_SLOT_CONFLICT: properties.get('query.check_slot_conflict'),
  POST_SLOT: properties.get('query.post_slot'),
  GET_SLOTS_BY_ID: properties.get('query.get_slots_by_id'),
  GET_DOCTOR_BY_ID: properties.get('query.get_doctor_by_id'),
  UPDATE_BOOKED_SLOTS: properties.get('query.update_booked_slots'),
  GET_SLOTS_BY_DOCTOR_ID: properties.get('query.get_slots_by_doctor_id'),
  CHECK_SLOT_CONFLICT_EXCEPT_SLOT_ID: properties.get('query.check_slot_conflict_except_slot_id'),
  UPDATE_SLOT: properties.get('query.update_slot'),
  //appointments
  POST_APPOINTMENT: properties.get('query.post_appointment'),
  DELETE_APPOINTEMENT: properties.get('query.delete_appointement'),
  GET_APPOINTMENTS_BY_DATE: properties.get('query.get_appointments_by_date'),
  GET_APPOINTMENTS_FOR_USER_CURRENTDATE: properties.get('query.get_appointments_for_user_currentdate'),
  GET_CURRENT_APPOINTMENT_QUEUE: properties.get('query.get_current_appointment_queue'),
  UPDATE_APPOINTMENT_STATUS: properties.get('query.update_appointment_status'),
  UPDATE_APPOINTMENT_TEST_STATUS: properties.get('query.update_appointment_test_status'),
  GET_APPOINTEMENT_BY_ID: properties.get('query.get_appointement_by_id'),
  GET_APPOINTEMENT_BY_USER_ID: properties.get('query.get_appointement_by_user_id'),
  GET_APPOINTEMENT_SEARCH: properties.get('query.get_appointement_search'),
};

const DB = { QUERY };
export default DB;

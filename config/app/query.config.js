'use strict'
import properties from '../index.config.js';

const QUERY = { GET_USER_BY_EMAIL: properties.get('query.get_userbyemail'),
    POST_APPOINTMENT:properties.get('query.post_appointment'),
    GET_EMPLOYEE_EMAIL:properties.get('query.get_employee_email'),
    ADD_NEW_EMPLOYEE: properties.get('query.post_newemployee'),
    ADD_NEW_USER: properties.get('query.post_newuser'),
    GET_DOCTORS: properties.get('query.get_doctors')
 };

const DB = { QUERY };
export default DB;

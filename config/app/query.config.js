'use strict'
import properties from '../index.config.js';

const QUERY = { GET_USER_BY_EMAIL: properties.get('query.get_userbyemail') };
const ADDNEWUSER = {ADD_NEW_USER: properties.get('query.post_newuser')}
const ADDNEWEMPLOYEE = {ADD_NEW_EMPLOYEE: properties.get('query.post_newemployee')}
const GETEMPLOYEEBYEMAIL = {GET_EMPLOYEE_EMAIL:properties.get('query.get_employee_email')}

const DB = { QUERY,ADDNEWUSER,ADDNEWEMPLOYEE,GETEMPLOYEEBYEMAIL };
export default DB;

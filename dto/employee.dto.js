'use strict';

import DB from '../config/app/query.config.js';
import pgsql from '../config/database/database.config.js';

const AddNewEmployeeDTO = async (
  hashedPassword,
  first_name,
  last_name,
  email,
  role,
  mobile_number,
) => {
  try {
    const query = DB.ADDNEWEMPLOYEE.ADD_NEW_EMPLOYEE;
    const replacements = {
      password: hashedPassword,
      first_name: first_name?first_name.trim():null,
      last_name: last_name?last_name.trim():null,
      email: email?email.trim():null,
      role: role?role.trim():null,
      is_first_password: 'Y',
      mobile_number: mobile_number?mobile_number.trim():null,
    };
    const data = await pgsql.query(query, { type: pgsql.QueryTypes.INSERT, replacements: replacements });
    return data;
  } catch (error) {
    console.log(error)
    console.error(error.messsage);
    throw new Error(error.messsage);
  }
};

const GetEmployeeDto = async (email, number) => {
  try {
    const query = DB.GETEMPLOYEEBYEMAIL.GET_EMPLOYEE_EMAIL;
    const data = await pgsql.query(query, {
      type: pgsql.QueryTypes.SELECT,
      replacements: { email: email ? email : null, mobile_number: number ? number : null },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error({ GetEmployeeDto: error.messsage });
    throw new Error(error.messsage);
  }
};
const EmployeeDto = { AddNewEmployeeDTO, GetEmployeeDto };

export default EmployeeDto;

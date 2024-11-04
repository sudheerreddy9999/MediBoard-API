'use strict';

import EmployeeDto from '../dto/employee.dto.js';
import JWT from '../middlewares/jwt.middleware.js';
import customUtility from '../utility/custom.utility.js';
import bcrypt from 'bcrypt';
import logger from '../utility/logger.utility.js';

const { customExceptionMessage } = customUtility;

const GetEmployeeAuthService = async (request) => {
  try {
    const { email, password } = request.headers;
    const employeeData = await EmployeeDto.GetEmployeeDto(email);
    if (employeeData.length === 0) {
      return customExceptionMessage(404, 'User does not exist');
    }
    const comparePasssword = await bcrypt.compare(password, employeeData[0].password);
    if (!comparePasssword) {
      return customExceptionMessage(401, 'Invalid password');
    }
    const employeeDetails = {
      employeeId: employeeData[0].employee_id,
      firstName: employeeData[0].first_name,
      email: employeeData[0].email,
      mobileNumber: employeeData[0].mobile_number,
      last_name: employeeData[0].last_name,
      role: employeeData[0].role,
    };
    const token = JWT.GenerateToken(employeeDetails);
    const employeeInfo = { employeeDetails, token };
    return employeeInfo;
  } catch (error) {
    logger.info({GetEmployeeAuthService: error.message})
    throw new Error(error.message);
  }
};
const addEmployeeService = async (request) => {
  try {
    const { password, first_name, last_name, email, role, mobile_number } = request.body;
    const userRole = request.role;
    if (userRole !== 'admin') {
      return customExceptionMessage(401, 'Not Authorized add employee');
    }
    const userByEmail = await EmployeeDto.GetEmployeeDto(email);
    if (userByEmail.length > 0) {
      return customExceptionMessage(409, 'Employee Already Exist');
    }
    const userByMobile = await EmployeeDto.GetEmployeeDto(null, mobile_number);
    if (userByMobile.length > 0) {
      return customExceptionMessage(409, 'Employee Already Exist');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const data = await EmployeeDto.AddNewEmployeeDTO(
      hashedPassword,
      first_name,
      last_name,
      email,
      role,
      mobile_number,
    );
    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

const EmployeeService = { addEmployeeService, GetEmployeeAuthService };

export default EmployeeService;

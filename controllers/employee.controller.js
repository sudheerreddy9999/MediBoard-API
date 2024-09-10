'use strict';

import EmployeeService from '../services/employee.service.js';

const GetEmployeeAuthController = async (request, response) => {
  try {
    const employeeData = await EmployeeService.GetEmployeeAuthService(request);
    if (employeeData.errorCode === 401) {
      return response.status(401).json({ message: employeeData.errorMessage });
    } else if (employeeData.errorCode === 404) {
      return response.status(404).json({ message: employeeData.errorMessage });
    } else {
      return response.status(200).json({ message: 'Employee Login success!', data: employeeData });
    }
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};

const AddNewEmployeeController = async (request, response) => {
  try {
    const data = await EmployeeService.addEmployeeService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: 'Employee added successfully' });
    }
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: 'Internal server error' });
  }
};

const EmployeeController = { AddNewEmployeeController, GetEmployeeAuthController };

export default EmployeeController;

'use strict';

import express from 'express';
import AuthController from '../controllers/auth.controller.js';
import EmployeeController from '../controllers/employee.controller.js';
import JWT from '../middlewares/jwt.middleware.js';
import validators from '../middlewares/validators/auth.validation.js';
import employeeValidations from '../middlewares/validators/employee.validation.js';
import AppointmentsController from '../controllers/appointments.controller.js';

const app = express();
const Router = express.Router();

Router.get('/auth', validators.loginValidation, AuthController.GetAuthController);
Router.post('/add', AuthController.AddNewUser);
Router.post('/appointments/add',AppointmentsController.AddAppointMentController);
Router.get('/employee/auth', employeeValidations.employeeAuthValidators, EmployeeController.GetEmployeeAuthController);
Router.use(JWT.VerifyToken);
Router.post('/employee/add',employeeValidations.addEmployeeCheck, EmployeeController.AddNewEmployeeController);
export default Router;

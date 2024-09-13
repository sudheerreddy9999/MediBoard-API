'use strict';

import express from 'express';
import AuthController from '../controllers/auth.controller.js';
import EmployeeController from '../controllers/employee.controller.js';
import JWT from '../middlewares/jwt.middleware.js';
import validators from '../middlewares/validators/auth.validation.js';
import employeeValidations from '../middlewares/validators/employee.validation.js';
import AppointmentsController from '../controllers/appointments.controller.js';
import DoctorsControllers from '../controllers/doctors.controllers.js';
import DoctorValidations from '../middlewares/validators/doctor.validation.js';

const Router = express.Router();

Router.get('/auth', validators.loginValidation, AuthController.GetAuthController);
Router.post('/add', AuthController.AddNewUser);
Router.post('/appointments/add', AppointmentsController.AddAppointMentController);
Router.get('/employee/auth', employeeValidations.employeeAuthValidators, EmployeeController.GetEmployeeAuthController);
Router.get('/doctors/auth', DoctorValidations.DoctorAuth, DoctorsControllers.GetDoctorAuthControllers);
Router.use(JWT.VerifyToken);
Router.post('/employee', employeeValidations.addEmployeeCheck, EmployeeController.AddNewEmployeeController);
Router.post('/doctors', DoctorValidations.PostDoctor, DoctorsControllers.PostDoctorController);
export default Router;

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
import SlotsController from '../controllers/slots.controller.js';
import SlotsValidations from '../middlewares/validators/slots.validation.js';
import AppointementValidations from '../middlewares/validators/appointment.validation.js';

const Router = express.Router();

Router.get('/auth', validators.loginValidation, AuthController.GetAuthController);

Router.post('/add', AuthController.AddNewUser);

Router.post(
  '/appointments/guest',
  AppointementValidations.validateAppointmentCreation,
  AppointmentsController.AddAppointmentController,
);

Router.get('/employee/auth', employeeValidations.employeeAuthValidators, EmployeeController.GetEmployeeAuthController);

Router.get('/doctors/auth', DoctorValidations.DoctorAuth, DoctorsControllers.GetDoctorAuthControllers);

Router.get('/doctors/all', DoctorsControllers.GetAllDoctorsController);

Router.get('/slots', AppointementValidations.CheckDoctorId, SlotsController.GetAvilableSlotsByDoctorIdController);

Router.get(
  '/appointments/current-queue',
  AppointementValidations.CheckDoctorId,
  AppointmentsController.GetCurrentAppointmentQueueController,
);

Router.use(JWT.VerifyToken);

Router.post('/employee', employeeValidations.addEmployeeCheck, EmployeeController.AddNewEmployeeController);

Router.post('/doctors', DoctorValidations.PostDoctor, DoctorsControllers.PostDoctorController);

Router.post('/slots', SlotsValidations.validateSlotCreation, SlotsController.CreateSlotsController);

Router.get('/slots/doctor', AppointementValidations.CheckDoctorId, SlotsController.GetAllSlotsByDoctorIdController);

Router.put('/slots', SlotsValidations.validateSlotUpdation, SlotsController.UpdateSlotsController);

Router.post(
  '/appointments',
  AppointementValidations.validateAppointmentCreation,
  AppointmentsController.AddAppointmentController,
);

Router.get(
  '/appointments',
  AppointementValidations.CheckAppointmentDate,
  AppointmentsController.GetAppointmentsByDateController,
);

export default Router;

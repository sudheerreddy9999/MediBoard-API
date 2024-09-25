'use strict';

import express from 'express';
import UserController from '../controllers/user.controller.js';
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
import multer from 'multer';
import UserValidations from '../middlewares/validators/user.validation.js';

const upload = multer({storage: multer.memoryStorage()});

const Router = express.Router();

Router.get('/user/auth', UserValidations.UserloginValidation, UserController.GetAuthController);

Router.post('/user/add', UserValidations.addUserCheck, UserController.AddNewUserController);

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

Router.post('/doctors', upload.single('image'), DoctorValidations.PostDoctor, DoctorsControllers.PostDoctorController);

Router.post('/slots', SlotsValidations.validateSlotCreation, SlotsController.CreateSlotsController);

Router.get('/slots/doctor', AppointementValidations.CheckDoctorId, SlotsController.GetAllSlotsByDoctorIdController);

Router.put('/slots', SlotsValidations.validateSlotUpdation, SlotsController.UpdateSlotsController);

Router.get(
  '/appointments',
  AppointementValidations.CheckAppointmentDate,
  AppointmentsController.GetAppointmentsByDateController,
);

Router.get(
  '/appointments/id',
  AppointementValidations.CheckAppointmentId,
  AppointmentsController.GetAppointmentByIdController,
);

Router.post(
  '/appointments',
  AppointementValidations.validateAppointmentCreation,
  AppointmentsController.AddAppointmentController,
);

Router.patch(
  '/appointments/complete',
  AppointementValidations.CheckAppointmentId,
  AppointmentsController.UpdateAppointmentCompletedStatusController,
);

Router.patch(
  '/appointments/cancel',
  AppointementValidations.CheckAppointmentId,
  AppointmentsController.UpdateAppointmentCancelStatusController,
);

export default Router;

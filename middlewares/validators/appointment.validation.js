import { body, header, validationResult } from 'express-validator';

const validateAppointmentCreation = [
  // Validate name: non-empty string, minimum length of 3 characters
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long')
    .notEmpty()
    .withMessage('Name is required'),

  // Validate mobile_number: must be a valid number and 10-15 digits
  body('mobile_number')
    .isNumeric()
    .withMessage('Mobile number must contain only numbers')
    .isLength({ min: 10, max: 10 })
    .withMessage('Mobile number must be between 10 and 15 digits')
    .notEmpty()
    .withMessage('Mobile number is required'),

  // Validate email: must be a valid email format
  body('email')
    .isEmail()
    .withMessage('Email must be a valid email address')
    .notEmpty()
    .withMessage('Email is required'),

  // Validate slot_id: must be a valid integer and required
  body('slot_id').isInt().withMessage('Slot ID must be an integer').notEmpty().withMessage('Slot ID is required'),

  // Validate is_emergency: must be 'Y' or 'N'
  body('is_emergency')
    .optional({ values: 'falsy' })
    .isIn(['Y', 'N'])
    .withMessage('is_emergency must be either "Y" or "N"'),

  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ message: errors.array() });
    }
    next();
  },
];

const CheckDoctorId = [
  header('doctor_id')
    .isInt()
    .withMessage('Doctor ID must be an integer')
    .notEmpty()
    .withMessage('Doctor ID is required'),
  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ message: errors.array() });
    }
    next();
  },
];

const CheckAppointmentDate = [
  header('created_date').isDate().withMessage('Date must be a valid date'),
  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ message: errors.array() });
    }
    next();
  },
];

const CheckAppointmentId = [
  header('appointment_id').isInt().withMessage('Enter valid appointment id'),
  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ message: errors.array() });
    }
    next();
  },
]

const AppointementValidations = {
  validateAppointmentCreation,
  CheckAppointmentDate,
  CheckDoctorId,
  CheckAppointmentId,
};

export default AppointementValidations;

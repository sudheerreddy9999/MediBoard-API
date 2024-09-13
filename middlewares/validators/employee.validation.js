import { body, header, validationResult } from 'express-validator';

const employeeAuthValidators = [
  header('email').trim().notEmpty().isEmail().withMessage('Enter valid email'),
  header('password').trim().notEmpty().isLength({ min: 7, max: 20 }).withMessage('Enter Valid password'),
  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ message: errors.array() });
    }
    next();
  },
];

const addEmployeeCheck = [
  body('email').trim().notEmpty().isEmail().withMessage('Enter valid Email'),
  body('password').trim().notEmpty().isLength({ min: 7, max: 20 }).withMessage('Enter valid password'),
  body('last_name')
    .trim()
    .notEmpty()
    .isLength({ min: 2, max: 15 })
    .isAlphanumeric()
    .withMessage('Enter valid last name'),
  body('first_name')
    .trim()
    .notEmpty()
    .isLength({ min: 2, max: 15 })
    .isAlphanumeric()
    .withMessage('Enter valid first name'),
  body('mobile_number')
    .trim()
    .notEmpty()
    .isLength({ min: 10, max: 10 })
    .isInt()
    .withMessage('Enter valid Phone Number'),
  body('role')
    .trim()
    .notEmpty()
    .custom((value) => {
      if (value === 'admin' || value === 'nurse' || value === 'doctor' || value === 'receptionist') {
        return true;
      }
    })
    .withMessage('Enter valid Phone role'),
  body('gender')
    .trim()
    .notEmpty()
    .isLength({ min: 1, max: 10 })
    .custom((value) => {
      if (value === 'M' || value === 'F' || value === 'others') {
        return true;
      }
    })
    .withMessage('Enter valid gender'),

  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ message: errors.array() });
    }
    next();
  },
];
const employeeValidations = { employeeAuthValidators,addEmployeeCheck };

export default employeeValidations;

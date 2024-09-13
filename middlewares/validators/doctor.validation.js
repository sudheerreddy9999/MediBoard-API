'use strict';
import { header, body, validationResult } from 'express-validator';

const DoctorAuth = [
  header('email').trim().notEmpty().isEmail().withMessage('Enter valid email'),
  header('password').trim().notEmpty().isLength({ min: 8 }).withMessage('Enter vaid password'),
  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors });
    }
    next();
  },
];

const PostDoctor = [
  body('name').trim().notEmpty().withMessage('Enter valid name'),
  body('email').trim().notEmpty().isEmail().withMessage('Enter valid email'),
  body('mobile_number').notEmpty().isInt().isLength({ max: 10, min:10 }).withMessage('Enter valid mobile number'),
  body('dob').trim().notEmpty().isDate().withMessage('Enter valid dob'),
  body('specialization').trim().notEmpty().withMessage('Enter valid specialization'),
  body('password').trim().notEmpty().isLength({ min: 7, max: 50 }).withMessage('Enter valid password'),
  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors });
    }
    next();
  },
];

const DoctorValidations = { DoctorAuth, PostDoctor };

export default DoctorValidations;

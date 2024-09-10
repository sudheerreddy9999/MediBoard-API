'use strict';
import { header, validationResult } from 'express-validator';

const loginValidation = [
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
const validators = { loginValidation };

export default validators;

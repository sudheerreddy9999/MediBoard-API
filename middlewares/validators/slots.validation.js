import { body, validationResult } from 'express-validator';

const validateSlotCreation = [
  body('doctor_id').isInt().withMessage('Doctor ID must be an integer').notEmpty().withMessage('Doctor ID is required'),
  body('description').trim().notEmpty().withMessage('Enter valid description'),
  body('title').trim().notEmpty().withMessage('Enter valid title'),
  body('available_slots')
    .isInt({ min: 1 })
    .withMessage('Available slots must be a positive integer')
    .notEmpty()
    .withMessage('Available slots are required'),
  body('slot_date')
    .isDate()
    .withMessage('Slot date must be a valid date in YYYY-MM-DD format')
    .custom((value) => {
      const inputDate = new Date(value);
      const currentDate = new Date();
      const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
      if (inputDate < currentDateOnly) {
        throw new Error('Slot date must be today or in the future');
      }
      return true;
    })
    .withMessage('Slot date must be today or in the future'),

  body('slot_time')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Slot time must be in HH:MM format')
    .notEmpty()
    .withMessage('Slot time is required'),

  body('slot_end_time')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Slot end time must be in HH:MM format')
    .notEmpty()
    .withMessage('Slot end time is required')
    .custom((value, { req }) => {
      if (value <= req.body.slot_time) {
        throw new Error('Slot end time must be after the slot start time');
      }
      return true;
    }),
  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ message: errors.array() });
    }
    next();
  },
];

const validateSlotUpdation = [
  body('slot_id').isInt().withMessage('slot ID must be an integer').notEmpty().withMessage('slot ID is required'),
  body('description').trim().notEmpty().withMessage('Enter valid description'),
  body('title').trim().notEmpty().withMessage('Enter valid title'),
  body('available_slots')
    .isInt({ min: 1 })
    .withMessage('Available slots must be a positive integer')
    .notEmpty()
    .withMessage('Available slots are required'),
  body('slot_date')
    .isDate()
    .withMessage('Slot date must be a valid date in YYYY-MM-DD format')
    .custom((value) => {
      const inputDate = new Date(value);
      const currentDate = new Date();
      const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
      if (inputDate < currentDateOnly) {
        throw new Error('Slot date must be today or in the future');
      }
      return true;
    })
    .withMessage('Slot date must be today or in the future'),

  body('slot_time')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Slot time must be in HH:MM format')
    .notEmpty()
    .withMessage('Slot time is required'),

  body('slot_end_time')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Slot end time must be in HH:MM format')
    .notEmpty()
    .withMessage('Slot end time is required')
    .custom((value, { req }) => {
      if (value <= req.body.slot_time) {
        throw new Error('Slot end time must be after the slot start time');
      }
      return true;
    }),
  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ message: errors.array() });
    }
    next();
  },
];

const SlotsValidations = { validateSlotCreation, validateSlotUpdation };

export default SlotsValidations;

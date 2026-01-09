const { body, validationResult } = require('express-validator');

const validateRegister = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

const validateTask = [
  body('title').notEmpty().withMessage('Title is required'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('deadline').isDate().withMessage('Valid deadline is required'),
  body('priority').isIn(['Low', 'Medium', 'High']).withMessage('Invalid priority'),
  body('status').optional().isIn(['Pending', 'Completed'])
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateTask,
  validate
};
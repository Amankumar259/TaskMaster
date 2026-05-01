import { body } from 'express-validator';

export const registerValidator = [
  body('name', 'Please add a name').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Please enter a password with 6 or more characters').isLength({
    min: 6,
  }),
];

export const loginValidator = [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists(),
];

export const taskValidator = [
  body('title', 'Title is required').optional().not().isEmpty().trim(),
  body('description').optional().trim(),
  body('status', 'Status must be pending or completed').optional().isIn(['pending', 'completed']),
];

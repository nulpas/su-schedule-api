import * as bcrypt from 'bcryptjs'
import { check } from 'express-validator/check'
import models from '../models';
const User = models.User;

export const userRules = {
  forRegister: [
    check('email')
      .isEmail().withMessage('Invalid email format')
      .custom(email => User.find({ where: { email } })
        .then(u => !!!u))
      .withMessage('Email exists'),
    check('password')
      .isLength({ min: 8 }).withMessage('Invalid password'),
    check('confirmPassword')
      .custom((confirmPassword, { req }) => req.body.password === confirmPassword)
      .withMessage('Passwords are different')
  ],
  forLogin: [
    check('email')
      .isEmail().withMessage('Invalid email format')
      .custom(email => User.findOne({ where: { email } })
        .then(u => !!u))
      .withMessage('Invalid email or password'),
    check('password')
      .custom((password, { req }) => {
        return User.findOne({ where: { email: req.body.email } })
          .then(u => bcrypt.compare(password, u!.password))
      }).withMessage('Invalid email or password')
  ]
};

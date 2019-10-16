import * as bcrypt from 'bcryptjs'
import { check } from 'express-validator';
import models from '../models';
const User = models.User;

export const userRules = {
  forRegister: [
    check('email')
      .isEmail().withMessage('Invalid email format')
      .custom((email: string) => User.findAndCountAll({ where: { email } }).then((r) => {
        if (r.count) {
          return Promise.reject();
        }
      })).withMessage('Email exists'),
    check('password')
      .isLength({ min: 8 }).withMessage('Invalid password'),
    check('confirmPassword')
      .custom(
        (confirmPassword: string, { req }) => req.body.password === confirmPassword
      ).withMessage('Passwords are different')
  ],
  forLogin: [
    check('email').isEmail().withMessage('Invalid email format'),
    check('password')
      .custom((password, { req }) => {
        return User.findOne({ where: { email: req.body.email } }).then((u) => {
          return (!u) ?
            Promise.reject() :
            bcrypt.compare(password, u!.password).then((r: boolean) => {
              if (!r) {
                return Promise.reject();
              }
            });
        })
      }).withMessage('Invalid email or password')
  ]
};

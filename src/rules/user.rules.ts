import * as bcrypt from 'bcryptjs'
import { check } from 'express-validator';
import models from '../models';
import Sequelize from 'sequelize/lib/sequelize';

const user: Sequelize.Model = models.user;

export const userRules = {
  forRegister: [
    check('name')
      .exists().withMessage('Name required')
      .custom((name: string) => !!name).withMessage('Name required'),
    check('email')
      .isEmail().withMessage('Invalid email format')
      .custom((email: string) => user.findAndCountAll({ where: { email } }).then((r) => {
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
    check('email')
      .isEmail().withMessage('Invalid email format')
      .custom((email) => {
        return user.findOne({ where: { email: email } }).then((u) => {
          if (!!u && !u.active) {
            return Promise.reject();
          }
        });
      }).withMessage('Your user needs to be activated'),
    check('password')
      .custom((password, { req }) => {
        return user.findOne({ where: { email: req.body.email } }).then((u) => {
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

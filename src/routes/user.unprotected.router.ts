import * as express from 'express';
import { matchedData, validationResult } from 'express-validator';
import { userRules } from '../rules/user.rules';
import userService from '../services/user.service';
import { UserRegisterModel, ResponseUser, UserLoginModel } from '../types/user.types';
import { Request, Response, Router } from '../types/generic.types';

const userRouterUnprotected: Router = express.Router();

userRouterUnprotected.post('/register', userRules.forRegister, (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json(errors.array());
  }
  const payload: UserRegisterModel = matchedData(request) as UserRegisterModel;
  return userService.register(payload).then((u: ResponseUser) => response.json(u));
});

userRouterUnprotected.post('/login', userRules.forLogin, (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json(errors.array());
  }
  const payload: UserLoginModel = matchedData(request) as UserLoginModel;
  const token = userService.login(payload);

  return token.then((t: any) => response.json(t));
});

export default userRouterUnprotected;

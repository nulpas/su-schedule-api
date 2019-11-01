import * as express from 'express';
import { matchedData, validationResult } from 'express-validator';
import { usersRules } from '../rules/users.rules';
import usersService from '../services/users.service';
import { UserRegisterModel, UserLoginModel } from '../types/user.types';
import { Request, Response, Router } from '../types/generic.types';
import Users from '../models/users';
import commonService from '../services/common.service';

const usersRouterUnprotected: Router = express.Router();

usersRouterUnprotected.post('/register', usersRules.forRegister, (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json(commonService.formatError(errors.array()));
  }
  const payload: UserRegisterModel = matchedData(request) as UserRegisterModel;
  return usersService.register(payload).then((u: Users | null) => response.json(u));
});

usersRouterUnprotected.post('/login', usersRules.forLogin, (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json(commonService.formatError(errors.array()));
  }
  const payload: UserLoginModel = matchedData(request) as UserLoginModel;
  const token = usersService.login(payload);

  return token.then((t: any) => response.json(t));
});

export default usersRouterUnprotected;

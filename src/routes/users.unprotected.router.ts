import * as express from 'express';
import { usersRules } from '../rules/users.rules';
import usersService from '../services/users.service';
import { UserRegisterModel, UserLoginModel } from '../types/user.types';
import { Payload, Request, Response, Router } from '../types/generic.types';
import Users from '../models/users';
import commonService from '../services/common.service';

const usersRouterUnprotected: Router = express.Router();

usersRouterUnprotected.post('/register', usersRules.forRegister, (request: Request, response: Response) => {
  const _payloadObject: Payload = commonService.getPayload(request);
  if (_payloadObject.errors) {
    return response.status(_payloadObject.errors[0].code).json(_payloadObject.errors);
  }
  const payload: UserRegisterModel = _payloadObject.payload;
  return usersService.register(payload).then((u: Users | null) => response.json(u));
});

usersRouterUnprotected.post('/login', usersRules.forLogin, (request: Request, response: Response) => {
  const _payloadObject: Payload = commonService.getPayload(request);
  if (_payloadObject.errors) {
    return response.status(_payloadObject.errors[0].code).json(_payloadObject.errors);
  }
  const payload: UserLoginModel = _payloadObject.payload;
  const token = usersService.login(payload);
  return token.then((t: any) => response.json(t));
});

export default usersRouterUnprotected;

import * as express from 'express';
import { matchedData, validationResult } from 'express-validator';
import { userRules } from '../rules/user.rules';
import { UserService } from '../services/user.service';
import { UserAddModel, UserViewModel } from '../models/user';
import { RequestUserRegister } from '../types/request.types';

const userRouterUnprotected: express.Router = express.Router();
const userService = new UserService();

userRouterUnprotected.post('/register', userRules.forRegister, (request: express.Request, response: express.Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json(errors.array());
  }
  const payload: RequestUserRegister = matchedData(request) as RequestUserRegister;
  return userService.register(payload).then((u: UserViewModel) => response.json(u));
});

userRouterUnprotected.post('/login', userRules.forLogin, (request: express.Request, response: express.Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json(errors.array());
  }
  const payload: UserAddModel = matchedData(request) as UserAddModel;
  const token = userService.login(payload);

  return token.then((t: any) => response.json(t));
});

export default userRouterUnprotected;

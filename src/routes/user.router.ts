import * as express from "express";
import models from '../models';
import { matchedData, validationResult } from 'express-validator';
import { userRules } from '../rules/user.rules';
import { UserService } from '../services/user.service';
import { UserAddModel } from '../models/user';
import {tokenGuard} from '../middlewares/token-guard';

const userRouter: express.Router = express.Router();
const userService = new UserService();

userRouter.post('/register', userRules['forRegister'], (request: express.Request, response: express.Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json(errors.array());
  }
  const payload: UserAddModel = matchedData(request) as UserAddModel;
  const user = userService.register(payload);

  return user.then(u => response.json(u));
});

userRouter.post('/login', userRules['forLogin'], (request: express.Request, response: express.Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json(errors.array());
  }
  const payload: UserAddModel = matchedData(request) as UserAddModel;
  const token = userService.login(payload);

  return token.then(t => response.json(t));
});

userRouter.get('/users', (request: express.Request, response: express.Response) => {
  models.User.findAll()
    .then(res => response.json(res))
    .catch((e) => response.status(500).json(e));
});

userRouter.get('/user/:userId', (request: express.Request, response: express.Response) => {
  models.User.findByPk(request.params.userId)
    .then(res => response.json(res))
    .catch((e) => response.status(500).json(e));
});

export default userRouter;

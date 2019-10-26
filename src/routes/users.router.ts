import * as express from 'express';
import models from '../models';
import { matchedData, validationResult } from 'express-validator';
import usersService from '../services/users.service';
import { Request, Response, Router } from '../types/generic.types';
import Users from '../models/users';
import { usersRules } from '../rules/users.rules';
import { UserLoginModel } from '../types/user.types';

const usersRouter: Router = express.Router();
const users: typeof Users = models.users as typeof Users;

usersRouter.get('/users', (request: Request, response: Response) => {
  users.findAll()
    .then((res: any) => response.json(res))
    .catch((e: any) => response.status(500).json(e));
});

usersRouter.get('/user/:userId', (request: Request, response: Response) => {
  users.findByPk(request.params.userId, { attributes: usersService.userAttributes })
    .then((res: any) => response.json(res))
    .catch((e: any) => response.status(500).json(e));
});

usersRouter.put('/user/:userId', (request: Request, response: Response) => {
  const _userId: number = Number(request.params.userId);

  return usersService.updateUser(_userId, request.body)
    .then((u: Users | null | undefined) => response.json(u))
    .catch((e: Error) => response.status(500).json(e.message));
});

usersRouter.put('/user/:userId/active', usersRules.forUserActive, (request: Request, response: Response) => {
  const _userId: number = Number(request.params.userId);
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json(errors.array());
  }
  const payload: UserLoginModel = matchedData(request) as UserLoginModel;

  return usersService.updateUser(_userId, payload)
    .then((u: Users | null | undefined) => response.json(u))
    .catch((e: Error) => response.status(500).json(e.message));
});

export default usersRouter;

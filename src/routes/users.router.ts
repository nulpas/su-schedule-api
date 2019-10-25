import * as express from 'express';
import models from '../models';
import { validationResult } from 'express-validator';
import usersService from '../services/users.service';
import { Request, Response, Router } from '../types/generic.types';

const usersRouter: Router = express.Router();
const users = models.users;

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

  console.log(validationResult(request).array());

  users.findByPk(_userId)
    .then((res: any) => {
      if (res) {
        return users.update(request.body, {where: {id: _userId}})
          .then(() => usersService.getUserById(_userId).then((u: any) => response.json(u)));
      } else {
        return response.status(400).json('Bad Request');
      }
    })
    .catch((e: any) => response.status(500).json(e));
});

export default usersRouter;

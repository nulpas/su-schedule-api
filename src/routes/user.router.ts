import * as express from 'express';
import models from '../models';
import { validationResult } from 'express-validator';
import userService from '../services/user.service';
import { Request, Response, Router } from '../types/generic.types';

const userRouter: Router = express.Router();
const user = models.user;

userRouter.get('/users', (request: Request, response: Response) => {
  user.findAll()
    .then((res: any) => response.json(res))
    .catch((e: any) => response.status(500).json(e));
});

userRouter.get('/user/:userId', (request: Request, response: Response) => {
  user.findByPk(request.params.userId, { attributes: userService.userAttributes })
    .then((res: any) => response.json(res))
    .catch((e: any) => response.status(500).json(e));
});

userRouter.put('/user/:userId', (request: Request, response: Response) => {
  const _userId: number = Number(request.params.userId);

  console.log(validationResult(request).array());

  user.findByPk(_userId)
    .then((res: any) => {
      if (res) {
        return user.update(request.body, {where: {id: _userId}})
          .then(() => userService.getUserById(_userId).then((u: any) => response.json(u)));
      } else {
        return response.status(400).json('Bad Request');
      }
    })
    .catch((e: any) => response.status(500).json(e));
});

export default userRouter;

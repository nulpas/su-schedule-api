import * as express from 'express';
import models from '../models';
import {validationResult} from 'express-validator';

const userRouter: express.Router = express.Router();
const user = models.user;

userRouter.get('/users', (request: express.Request, response: express.Response) => {
  user.findAll()
    .then((res: any) => response.json(res))
    .catch((e: any) => response.status(500).json(e));
});

userRouter.get('/user/:userId', (request: express.Request, response: express.Response) => {
  user.findByPk(request.params.userId)
    .then((res: any) => response.json(res))
    .catch((e: any) => response.status(500).json(e));
});

userRouter.put('/user/:userId', (request: express.Request, response: express.Response) => {
  console.log(validationResult(request).array());

  user.findByPk(request.params.userId)
    .then((res: any) => {
      if (res) {
        user.update(request.body, {where: {id: request.params.userId}}).then(() => {
          user.findByPk(request.params.userId).then((userObject: any) => response.json(userObject));
        });
      } else {
        response.status(400).json('Bad Request');
      }
    })
    .catch((e: any) => response.status(500).json(e));
});

export default userRouter;

import * as express from "express";
import models from '../models';

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

export default userRouter;

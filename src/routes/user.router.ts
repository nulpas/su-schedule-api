import * as express from "express";
import models from '../models';

const userRouter: express.Router = express.Router();

userRouter.get('/user', (request: express.Request, response: express.Response) => {
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

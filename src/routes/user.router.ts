import * as express from "express";
import { Sequelize } from 'sequelize/lib/sequelize';
import models from '../models';

const userRouter: express.Router = express.Router();
const user: Sequelize.Model = models.user;

userRouter.get('/users', (request: express.Request, response: express.Response) => {
  user.findAll()
    .then((res) => response.json(res))
    .catch((e) => response.status(500).json(e));
});

userRouter.get('/user/:userId', (request: express.Request, response: express.Response) => {
  user.findByPk(request.params.userId)
    .then((res) => response.json(res))
    .catch((e) => response.status(500).json(e));
});

export default userRouter;

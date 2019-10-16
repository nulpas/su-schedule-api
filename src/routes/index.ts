import * as express from 'express';
import userRouter from './user.router';
import activitiesRouter from './activities.router';

export interface SuScheduleRouter {
  userRouter: express.Router;
  activitiesRouter: express.Router;
}

export default {
  userRouter,
  activitiesRouter
} as SuScheduleRouter;

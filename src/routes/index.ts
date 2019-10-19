import * as express from 'express';
import userRouter from './user.router';
import activitiesRouter from './activities.router';

export interface SuScheduleRouter {
  [routerName: string]: express.Router;
}

export default {
  userRouter,
  activitiesRouter
} as SuScheduleRouter;

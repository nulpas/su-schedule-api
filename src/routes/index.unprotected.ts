import * as express from 'express';
import userRouterUnprotected from './user.unprotected.router';

export interface SuScheduleRouterUnprotected {
  [routerUnprotectedName: string]: express.Router;
}

export default {
  userRouterUnprotected
} as SuScheduleRouterUnprotected;

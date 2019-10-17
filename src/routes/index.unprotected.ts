import * as express from 'express';
import userRouterUnprotected from './user.unprotected.router';

export interface SuScheduleRouterUnprotected {
  userRouterUnprotected: express.Router;
}

export default {
  userRouterUnprotected
} as SuScheduleRouterUnprotected;

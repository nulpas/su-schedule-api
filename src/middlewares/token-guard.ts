import * as jwt from 'jsonwebtoken';
import { IncomingHttpHeaders } from 'http';
import * as express from 'express';
import { UserService } from '../services/user.service';

type TokenGuard = () => express.RequestHandler;

const userService = new UserService();

function getTokenFromHeaders(headers: IncomingHttpHeaders) {
  const header: string = headers.authorization as string;
  return (header) ? header.split(' ')[1] : header;
}

export const tokenGuard: (TokenGuard) = (() => (request: express.Request, response: express.Response, next: express.NextFunction) => {
  const token = getTokenFromHeaders(request.headers) || request.query.token || request.body.token || '';
  userService.verifyToken(token).then((a: boolean) => {
    if (!a) {
      return response.status(403).send({ message: 'No access' });
    }
    next();
  });
});

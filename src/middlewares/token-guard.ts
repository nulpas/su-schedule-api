import { IncomingHttpHeaders } from 'http';
import usersService from '../services/users.service';
import { NextFunction, Request, RequestHandler, Response } from '../types/generic.types';

type TokenGuard = () => RequestHandler;

function getTokenFromHeaders(headers: IncomingHttpHeaders) {
  const header: string = headers.authorization as string;
  return (header) ? header.split(' ')[1] : header;
}

export const tokenGuard: (TokenGuard) = (() => (request: Request, response: Response, next: NextFunction) => {
  const token = getTokenFromHeaders(request.headers) || request.query.token || request.body.token || '';
  usersService.verifyToken(token).then((a: boolean) => {
    if (!a) {
      return response.status(403).send({ message: 'No access' });
    }
    next();
  });
});

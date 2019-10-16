import * as express from 'express';

const activitiesRouter: express.Router = express.Router();

activitiesRouter.get('/activities', (request: express.Request, response: express.Response) => {
  response.json('Testing separated routes...');
});

export default activitiesRouter;

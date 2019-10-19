import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import { Sequelize } from 'sequelize';
import * as dotEnv from 'dotenv';
import * as configFile from './config/config.json';
import models from './models';
import routes from './routes';
import routesUnprotected from './routes/index.unprotected';
import { tokenGuard } from './middlewares/token-guard';

dotEnv.config();
const app = express();
const port = 4001;

models.sequelize.sync()
  .then(() => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());

    app.get('/', (request: express.Request, response: express.Response) => {
      response.json('Hello World');
    });

    Object.keys(routesUnprotected).forEach((e: string) => {
      app.use('/', routesUnprotected[e]);
    });

    app.use('/healthcheck', (request: express.Request, response: express.Response) => {
      const env: string = process.env.NODE_ENV || 'development';
      const config: any = configFile[env];
      const sequelize: Sequelize = new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        dialect: config.dialect
      });
      return sequelize
        .authenticate()
        .then(() => response.sendStatus(200))
        .catch((e) => response.status(500).json(e));
    });

    //## Activated authentication from here:
    app.use(tokenGuard());

    //## Loads all routes that need token authentication.
    Object.keys(routes).forEach((e: string) => {
      app.use('/', routes[e]);
    });

    //## Protected route test
    app.get('/protected', (request: express.Request, response: express.Response) => {
      response.json('Protected Hello World');
    });

    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch((error: any) => {
    throw new Error(error);
  });

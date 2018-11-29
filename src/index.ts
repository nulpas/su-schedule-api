import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as Sequelize from 'sequelize';
import * as dotEnv from 'dotenv';
import * as configFile from './config/config.json';
dotEnv.config();

const app = express();
const port = 4001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/healthcheck', (request, response) => {
  const env = process.env.NODE_ENV || 'development';
  const config = configFile[env];
  const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    operatorsAliases: false
  });

  return sequelize
    .authenticate()
    .then(() => response.sendStatus(200))
    .catch((e) => response.status(500).send(e));
});

// Unprotected Get
app.get('/', (request, response, next) => {
  response.json('Hello World');
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

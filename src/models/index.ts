import * as dotEnv from 'dotenv';
import configFile from '../config/config.json';
import * as fs from 'fs';
import * as path from 'path';
import { Sequelize } from 'sequelize';

dotEnv.config();
const env: string = process.env.NODE_ENV || 'development';

console.log('####################### NODE_ENV: ', process.env.NODE_ENV);

const config: any = configFile[env];
const basename: string = path.basename(__filename);
const db: any = {};

const sequelize: Sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

fs
  .readdirSync(__dirname)
  .filter((file: string) => ((file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')))
  .forEach((file: string) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;

    console.log('MODEL: ', file);
  });

Object.keys(db).forEach((modelName: string) => {
  if (Object.prototype.hasOwnProperty.call(db[modelName], 'associate')) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

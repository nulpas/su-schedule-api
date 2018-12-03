import * as dotEnv from 'dotenv';
import * as configFile from '../config/config.json';
import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';

dotEnv.config();
const env: string = process.env.NODE_ENV || 'development';
const config: any = configFile[env];
const basename: string = path.basename(__filename);
const db: any = {};

const sequelize: Sequelize.Sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  operatorsAliases: false
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    console.log(file);
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (Object.prototype.hasOwnProperty.call(db[modelName], 'associate')) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

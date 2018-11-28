import * as Sequelize from 'sequelize';

const db = 'su';
const username = 'root';
const password = 'Sandira7391551210';

export const sequelize = new Sequelize(db, username, password, {
  dialect: "mysql",
  port: 3306,
});

sequelize.authenticate();

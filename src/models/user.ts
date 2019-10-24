import { Model, Sequelize } from 'sequelize';

export default (sequelize: Sequelize, dataTypes: any): Model => {
  const user: any = sequelize.define('user', {
    name: dataTypes.STRING,
    email: {
      allowNull: false,
      type: dataTypes.STRING
    },
    password: {
      allowNull: false,
      type: dataTypes.STRING
    },
    active: {
      allowNull: false,
      type: dataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  user.associate = (models: any) => {
    // ## Associations can be defined here
  };
  return user;
};

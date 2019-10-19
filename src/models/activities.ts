import { Model, Sequelize } from 'sequelize';

export default (sequelize: Sequelize, dataTypes: any): Model => {
  const activities: any = sequelize.define('activities', {
    name: dataTypes.STRING
  }, {});
  activities.associate = (models: any) => {
    // ## Associations can be defined here
  };
  return activities;
};

import { Model, Sequelize } from 'sequelize';

export default (sequelize: Sequelize, DataTypes: any): Model => {
  const activities: any = sequelize.define('activities', {
    name: DataTypes.STRING
  }, {});
  activities.associate = function(models: any) {
    //## Associations can be defined here
  };
  return activities;
};

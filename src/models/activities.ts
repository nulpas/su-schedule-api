import Sequelize from "sequelize/lib/sequelize";
import DataTypes from 'sequelize/lib/data-types';

export default (sequelize: Sequelize.Sequelize, DataTypes: DataTypes.DataTypes): Sequelize.Model => {
  const activities: Sequelize.Model = sequelize.define('activities', {
    name: DataTypes.STRING
  }, {});
  activities.associate = function(models) {
    //## Associations can be defined here
  };
  return activities;
};

import Sequelize from "sequelize/lib/sequelize";
import DataTypes from 'sequelize/lib/data-types';

export default (sequelize: Sequelize.Sequelize, DataTypes: DataTypes.DataTypes) => {
  const activities = sequelize.define('activities', {
    name: DataTypes.STRING
  }, {});
  activities.associate = function(models) {
    // associations can be defined here
  };
  return activities;
};

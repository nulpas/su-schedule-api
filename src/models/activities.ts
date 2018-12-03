import * as Sequelize from "sequelize";

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
  const activities = sequelize.define('activities', {
    name: DataTypes.STRING
  }, {});
  activities.associate = function(models) {
    // associations can be defined here
  };
  return activities;
};

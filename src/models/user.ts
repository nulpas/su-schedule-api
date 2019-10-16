import Sequelize from "sequelize/lib/sequelize";
import DataTypes from 'sequelize/lib/data-types';

export interface UserAddModel {
  email: string;
  password: string;
}

export interface UserModel extends Sequelize.Model<UserModel, UserAddModel>{
  id: number;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserViewModel {
  id: number;
  email: string;
}

export default (sequelize: Sequelize.Sequelize, DataTypes: DataTypes.DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};

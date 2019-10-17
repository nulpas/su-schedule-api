import Sequelize from 'sequelize/lib/sequelize';
import DataTypes from 'sequelize/lib/data-types';

export interface UserAddModel {
  name: string;
  email: string;
  password: string;
}

export interface UserModel extends Sequelize.Model<UserModel, UserAddModel>{
  id: number;
  name: string;
  email: string;
  password: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserViewModel {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

export default (sequelize: Sequelize.Sequelize, DataTypes: DataTypes.DataTypes): Sequelize.Model => {
  const user: Sequelize.Model = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    active: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  user.associate = function(models) {
    //## Associations can be defined here
  };
  return user;
};

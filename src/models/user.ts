import { Model, Sequelize } from 'sequelize';


export interface UserAddModel {
  name: string;
  email: string;
  password: string;
}

export interface UserModel extends Model<UserModel, UserAddModel>{
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

export default (sequelize: Sequelize, DataTypes: any): Model => {
  const user: any = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    active: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  user.associate = function(models: any) {
    //## Associations can be defined here
  };
  return user;
};

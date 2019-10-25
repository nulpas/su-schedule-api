import { DataTypes, Model, ModelAttributes } from 'sequelize';

export default class Activities extends Model {
  public static readonly attributes: ModelAttributes = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  };

  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// export default (sequelize: Sequelize, dataTypes: any): Model => {
//   const activities: any = sequelize.define('activities', {
//     name: dataTypes.STRING
//   }, {});
//   activities.associate = (models: any) => {
//     // ## Associations can be defined here
//   };
//   return activities;
// };

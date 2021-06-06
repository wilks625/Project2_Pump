const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
​
class Image extends Model {}
​
Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    contentType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contentBytes: {
        type: DataTypes.STRING
    },
    profileId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'profile',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'image',
  }
);
​
module.exports = Image;
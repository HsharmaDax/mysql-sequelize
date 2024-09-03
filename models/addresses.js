'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Addresses.hasMany(models.Student, { foreignKey: 'Address_Id'});
    }
  }
  Addresses.init({
    House_No: DataTypes.STRING,
    Pin: DataTypes.INTEGER,
    City: DataTypes.STRING,
    State: DataTypes.STRING,
    Country: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Addresses',
  });
  return Addresses;
};
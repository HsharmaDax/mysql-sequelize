'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.belongsTo(models.Addresses, { foreignKey: 'Address_Id'});
      Student.belongsTo(models.Courses, { foreignKey: 'Course_Id'});
    }
  }
  Student.init({
    Name: DataTypes.STRING,
    Email: DataTypes.STRING,
    DOB: DataTypes.DATE,
    Father_Name: DataTypes.STRING,
    Gender: DataTypes.ENUM('Male', 'Female', 'Other'),
    Address_Id: DataTypes.INTEGER,
    Course_Id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};
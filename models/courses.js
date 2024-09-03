'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Courses.hasMany(models.Student, { foreignKey: 'Course_Id'});
    }
  }
  Courses.init({
    Course_Name: DataTypes.STRING,
    Fee: DataTypes.NUMERIC,
    Min_Year: DataTypes.INTEGER,
    Max_Year: DataTypes.INTEGER,
    Eligibility: DataTypes.STRING,
    Category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Courses',
  });
  return Courses;
};
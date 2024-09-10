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
      Courses.hasMany(models.Student, { foreignKey: 'Course_Id' });
    }
  }
  Courses.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Course_Name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    Fee: {
      type: DataTypes.NUMERIC,
      allowNull: false
    },
    Min_Year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Max_Year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Eligibility: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Course',
    paranoid: true,
    timestamps: true,
  });
  return Courses;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Question.hasMany(models.Answer, { foreignKey: 'Question_Id' });
      Question.belongsTo(models.Student, { foreignKey: 'Student_Id' });
    }
  }
  Question.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Question: {
      allowNull: false,
      type: DataTypes.STRING
    },
    Student_Id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Students',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Question',
    paranoid: true,
    timestamps: true,
  });
  return Question;
};
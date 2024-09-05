'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Answer.belongsTo(models.Student, { foreignKey: 'Student_Id' });
      Answer.belongsTo(models.Question, { foreignKey: 'Question_Id' });
    }
  }
  Answer.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Answer: {
      allowNull: false,
      type: DataTypes.STRING
    },
    Question_Id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Question',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'        
    },
    Student_Id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Student',
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
    modelName: 'Answer',
    paranoid: true,
    timestamps: true,
  });
  return Answer;
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Course_Name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Fee: {
        allowNull: false,
        type: Sequelize.NUMERIC
      },
      Min_Year: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      Max_Year: {
        type: Sequelize.INTEGER
      },
      Eligibility: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Category: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses');
  }
};
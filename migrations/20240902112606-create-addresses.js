'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      House_No: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Pin: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      City: {
        allowNull: false,
        type: Sequelize.STRING
      },
      State: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Country: {
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
    await queryInterface.dropTable('Addresses');
  }
};
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TRIGGER alertAfterAdd 
      AFTER DELETE ON students 
      FOR EACH ROW
      BEGIN
       delete from addresses where addresses.id = old.Address_Id;
      END;
      `)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS alertAfterAdd
      `)
  }
};

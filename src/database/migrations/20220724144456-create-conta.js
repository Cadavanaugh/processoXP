/* eslint-disable no-unused-vars */
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contas', {
      CodCliente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      Saldo: {
        type: Sequelize.DECIMAL
      }
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Contas');
  }
};
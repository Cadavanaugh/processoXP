'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ativos', {
      CodAtivo: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Valor: {
        type: Sequelize.DOUBLE
      },
      QtdeAtivos: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1000,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ativos');
  }
};
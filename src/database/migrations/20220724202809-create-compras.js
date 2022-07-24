'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Compras', {
      CodCompra: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CodCliente: {
        type: Sequelize.INTEGER,
        refereces: {
          model: 'Contas',
          key: 'CodCliente'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      CodAtivo: {
        type: Sequelize.INTEGER,
        refereces: {
          model: 'Ativos',
          key: 'CodAtivo'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      QtdeAtivos: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Compras');
  }
};
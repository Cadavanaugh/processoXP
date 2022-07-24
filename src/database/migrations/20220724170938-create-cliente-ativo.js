'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ClienteAtivos', {
      CodCliente: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Contas',
          key: 'CodCliente'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      CodAtivo: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Ativos',
          key: 'CodAtivo'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      QtdeAtivos: {
        type: Sequelize.INTEGER
      },
    }, {timestamps: false});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ClienteAtivos');
  }
};
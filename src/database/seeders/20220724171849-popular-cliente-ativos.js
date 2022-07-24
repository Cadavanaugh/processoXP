'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ClienteAtivos',
    [
      {CodCliente: 1, CodAtivo: 1, QtdeAtivos: 10},
      {CodCliente: 1, CodAtivo: 2, QtdeAtivos: 30},
      {CodCliente: 2, CodAtivo: 3, QtdeAtivos: 1},
      {CodCliente: 3, CodAtivo: 4, QtdeAtivos: 100},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ClienteAtivos', null, {});
  }
};
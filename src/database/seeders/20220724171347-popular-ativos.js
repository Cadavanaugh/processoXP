'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Ativos',
    [
      {Valor: 11.67},
      {Valor: 20},
      {Valor: 3.4},
      {Valor: 101.25},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ativos', null, {});
  }
};


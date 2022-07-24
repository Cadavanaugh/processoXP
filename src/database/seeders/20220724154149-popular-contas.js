'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Contas',
    [
      {Saldo: 100},
      {Saldo: 200},
      {Saldo: 300},
      {Saldo: 400},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Contas', null, {});
  }
};

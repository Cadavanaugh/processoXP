'use strict';

module.exports = (sequelize, DataTypes) => {
  const Conta = sequelize.define('Conta', {
    CodCliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    Saldo: {
      allowNull: false,
      type: DataTypes.DECIMAL
    }
  }, {tableName: 'Contas', timestamps: false});

  return Conta;
};
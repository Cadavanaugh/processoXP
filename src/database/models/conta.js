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

  Conta.associate = (models) => {
    models.Conta.hasMany(models.Compra,{
      foreignKey: 'CodCliente',
      as: 'Compras'
    })
  }

  return Conta;
};
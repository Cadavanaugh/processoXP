'use strict';
module.exports = (sequelize, DataTypes) => {

  const Compra = sequelize.define("Compra", {
    CodCompra: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    QtdeAtivos: DataTypes.INTEGER
  }, {tableName: 'Compras', timestamps: false})
  
  Compra.associate = (models) => {
    models.Compra.belongsTo(models.Conta,{
      as: 'Contas',
      foreignKey: 'CodCliente',
    })
    models.Compra.belongsToMany(models.Ativo, {
      as: "Ativos",
      foreignKey: "CodCompra",
      otherKey:'CodAtivo',
      through: Compra,
    })
    models.Ativo.belongsToMany(models.Compra, {
      foreignKey: "CodAtivo",
      otherKey:'CodCompra',
      as: "Compras",
      through: Compra
    })
  };
  return Compra;
};
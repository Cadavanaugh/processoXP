'use strict';
module.exports = (sequelize, DataTypes) => {
  const ClienteAtivo = sequelize.define("ClienteAtivo",{
    QtdeAtivos: {
      type: DataTypes.INTEGER,
    }
  }, {timestamps: false, tableName: "ClienteAtivos"})

  ClienteAtivo.associate = (models) => {
    models.Conta.belongsToMany(models.Ativo, {
      as: 'Ativos',
      through: ClienteAtivo,
      foreignKey: 'CodCliente',
      otherKey: 'CodAtivo',
    });
    models.Ativo.belongsToMany(models.Conta, {
      as: 'Contas',
      through: ClienteAtivo,
      foreignKey: 'CodAtivo',
      otherKey: 'CodCliente',
    });
  };

  return ClienteAtivo;
};
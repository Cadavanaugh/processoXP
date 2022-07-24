'use strict';
'use strict'
module.exports = (sequelize, DataTypes) => {
  const Ativo = sequelize.define("Ativo", {
    CodAtivo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    Valor: DataTypes.DECIMAL,
    QtdeAtivos: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {timestamps: false, tableName: "Ativos"})

  return Ativo;
};
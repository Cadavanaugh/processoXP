const {Conta, Ativo, ClienteAtivo} = require('../database/models')
const NotFoundError = require('../middlewares/NotFoundError');

const AtivoService = {
  getAllByClient: async (CodCliente) => {
    const ativos = await ClienteAtivo.findAll({
      where: {CodCliente}
    })

    const final = []

    await Promise.all(ativos.map(async (x) => {
      const { Valor } = await Ativo.findOne({where: {CodAtivo: x.dataValues.CodAtivo}})
      final.push({...x.dataValues, Valor})
    }))

    return final
  },
  getAsset: async (CodAtivo) => {
    const ativos = await Ativo.findOne({where: {CodAtivo}})
    return ativos
  },
  validateAllByClient: async (CodCliente) => {
    try{
      const {dataValues: {Saldo}} = await Conta.findByPk(CodCliente);
    } catch {
      throw new NotFoundError("Conta não encontrada")
    }
  },
  validateGetAsset: async (CodAtivo) => {
    try{
      const {dataValues: {Valor: ValorPorAtivo, QtdeAtivos}} = await Ativo.findByPk(CodAtivo)
    } catch {
      throw new NotFoundError("Ativo não encontrado")
    }
  }
}

module.exports = AtivoService;
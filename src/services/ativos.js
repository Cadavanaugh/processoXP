const {Conta, Ativo, ClienteAtivo} = require('../database/models')

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
  }
}

module.exports = AtivoService;
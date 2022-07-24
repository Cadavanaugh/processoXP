const AtivoService = require('../services/ativos');

const AtivosController = {
  getAllByClient: async (req, res) => {
    const {CodCliente} = req.params
    await AtivoService.validateAllByClient(CodCliente)
    const ativos = await AtivoService.getAllByClient(CodCliente)
    return res.status(200).json(ativos);
  },
  getAsset: async (req, res) => {
    const {CodAtivo} = req.params
    await AtivoService.validateGetAsset(CodAtivo)
    const ativo = await AtivoService.getAsset(CodAtivo);
    return res.status(200).json(ativo)
  }
}

module.exports = AtivosController;
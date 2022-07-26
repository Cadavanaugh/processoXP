const contaService = require('../services/conta');

const contaController = {
  getInfo: async (req, res) => {
    const {CodCliente} = req.params;
    await contaService.validateConta(CodCliente);
    const info = await contaService.getInfo(CodCliente);
    return res.status(200).json(info);
  },
  saque: async (req, res) => {
    const {CodCliente, Valor} = await contaService.validateSaque(req.body)
    await contaService.validateConta(CodCliente);
    const saque = await contaService.saque(CodCliente, Valor)
    return res.status(200).json(saque)
  },
  deposito: async (req, res) => {
    const {CodCliente, Valor} = await contaService.validateDeposito(req.body)
    await contaService.validateConta(CodCliente);
    const deposito = await contaService.deposito(CodCliente, Valor)
    return res.status(200).json(deposito)
  }
}

module.exports = contaController
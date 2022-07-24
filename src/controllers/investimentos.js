const investimentoService = require('../services/investimentos');

const investimentosController = {
  comprar: async (req, res) => {
    const body = await investimentoService.validateCompra(req.body)
    const compra = await investimentoService.comprar(body)
    return res.status(200).json(compra);
  },
  vender: async (req, res) => {
    const body = await investimentoService.validateVenda(req.body)
    const venda = await investimentoService.vender(body)
    return res.status(200).json(venda);
  }
}

module.exports = investimentosController;
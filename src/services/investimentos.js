const {Conta, Ativo, ClienteAtivo, Compra} = require('../database/models')
const Joi = require('joi')
const NotFoundError = require("../middlewares/NotFoundError");

const investimentoService = {
  comprar: async ({CodAtivo, CodCliente, QtdeAtivos: QtdeCompra}) => {
    
    await Compra.create({CodAtivo, CodCliente, QtdeAtivos: QtdeCompra})

    const {dataValues: {Valor: ValorPorAtivo, QtdeAtivos}} = await Ativo.findByPk(CodAtivo)
    const {dataValues: {Saldo}} = await Conta.findByPk(CodCliente);

    await Conta.update({
      Saldo: Saldo - ValorPorAtivo * QtdeCompra
    },{
      where: {CodCliente}
    })
    await Ativo.update({
        QtdeAtivos: QtdeAtivos - QtdeCompra
      },{
        where: {CodAtivo}
      }
    )

    const ContaTemEsseAtivo = await ClienteAtivo.findOne({where: {CodAtivo, CodCliente}})

    if (!ContaTemEsseAtivo) {
      await ClienteAtivo.create({CodAtivo, CodCliente, QtdeAtivos: QtdeCompra})
    } else {
      const QtdeAtivosNaConta = ContaTemEsseAtivo.QtdeAtivos
      await ClienteAtivo.update({
          QtdeAtivos: Number(QtdeAtivosNaConta) + Number(QtdeCompra)
        },{
          where: {CodAtivo, CodCliente}
        }
      )
    }

    return {
      operacao: 'Compra',
      CodAtivo,
      CodCliente,
      QtdeAtivos: QtdeCompra
    }
  },
  validateCompra: async ({CodAtivo, CodCliente, QtdeAtivos: QtdeCompra}) => {

    try{
      const {dataValues: {Valor: ValorPorAtivo, QtdeAtivos}} = await Ativo.findByPk(CodAtivo)
    } catch {
      throw new NotFoundError("Ativo não encontrado")
    }
    try{
      const {dataValues: {Saldo}} = await Conta.findByPk(CodCliente);
    } catch {
      throw new NotFoundError("Conta não encontrada")
    }

    const {dataValues: {QtdeAtivos}} = await Ativo.findByPk(CodAtivo)
    
    const bodyDeCompra = Joi.object({
      QtdeAtivos: Joi.number().integer().positive().max(QtdeAtivos).required(),
      CodCliente: Joi.number().integer().positive().required(),
      CodAtivo: Joi.number().integer().positive().required(),
    })

    const {error, value} = bodyDeCompra.validate({CodAtivo, CodCliente, QtdeAtivos: QtdeCompra})

    if(error) {
      error.message = error.details[0].message;
      error.code = 400
      throw error;
    }

    return value;
  },
  vender: async ({CodAtivo, CodCliente, QtdeAtivos: QtdeVenda}) => {
    
    const venda = await Compra.destroy({where: {CodAtivo, CodCliente}})

    const {dataValues: {Valor: ValorPorAtivo, QtdeAtivos}} = await Ativo.findByPk(CodAtivo)
    const {dataValues: {Saldo}} = await Conta.findByPk(CodCliente)

    await Conta.update({
      Saldo: Saldo + ValorPorAtivo * QtdeVenda
    },{
      where: {CodCliente}
    })
    await Ativo.update({
        QtdeAtivos: QtdeAtivos + QtdeVenda
      },{
        where: {CodAtivo}
      }
    )

    const {dataValues: {QtdeAtivos: QtdeAtivosDaConta}} = await ClienteAtivo.findOne({where: {CodAtivo, CodCliente}})

    if (QtdeAtivosDaConta - QtdeVenda > 0) {
      await ClienteAtivo.update({
        CodAtivo, CodCliente, QtdeAtivos: QtdeAtivosDaConta - QtdeVenda
      },{ where: {CodAtivo, CodCliente} })
    } else {
      await ClienteAtivo.destroy({where: {CodAtivo, CodCliente}})
    }

    return {
      operacao: 'Venda',
      CodAtivo,
      CodCliente,
      QtdeAtivos: QtdeVenda
    }
  },
  validateVenda: async ({CodAtivo, CodCliente, QtdeAtivos: QtdeVenda}) => {
    
    try{
      const {dataValues: {Saldo}} = await Conta.findByPk(CodCliente);
    } catch {
      throw new NotFoundError("Conta não encontrada")
    }
    try{
      const {dataValues: {Valor: ValorPorAtivo, QtdeAtivos}} = await Ativo.findByPk(CodAtivo)
    } catch {
      throw new NotFoundError("Ativo não encontrado")
    }

    const {dataValues: {QtdeAtivos}} = await ClienteAtivo.findOne({
        where: {CodAtivo, CodCliente}
      })

    const bodyDeVenda = Joi.object({
      QtdeAtivos: Joi.number().integer().positive().max(QtdeAtivos).required(),
      CodCliente: Joi.number().integer().positive().required(),
      CodAtivo: Joi.number().integer().positive().required(),
    })
    
    const {error, value} = bodyDeVenda.validate({CodAtivo, CodCliente, QtdeAtivos: QtdeVenda})

    if(error) {
      error.message = error.details[0].message;
      error.code = 400
      throw error;
    }

    return value;
  }
}

module.exports = investimentoService;
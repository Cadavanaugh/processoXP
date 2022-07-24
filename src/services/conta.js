const {Conta} = require('../database/models');
const Joi = require('joi');
const NotFoundError = require('../middlewares/NotFoundError');

const contaService = {
  getInfo: async (CodCliente) => {
    const result = await Conta.findByPk(CodCliente)
    return result;
  },
  saque: async (CodCliente, Valor) => {
    const {Saldo: antigoValor} = await Conta.findByPk(CodCliente)
    const saque = await Conta.update({Saldo: Number(antigoValor) - Number(Valor)}, {where: {CodCliente}})
    return {
      CodCliente,
      Saldo: Number(antigoValor) - Number(Valor)
    }
  },
  deposito: async (CodCliente, Valor) => {
    const {Saldo: antigoValor} = await Conta.findByPk(CodCliente)
    const deposito = await Conta.update({Saldo: Number(antigoValor) + Number(Valor)}, {where: {CodCliente}})
    return {
      CodCliente,
      Saldo: Number(antigoValor) + Number(Valor)
    }
  },
  validateSaque: async (body) => {
    const {Saldo} = await Conta.findByPk(body.CodCliente)

    const schema = Joi.object({
      CodCliente:Joi.number().integer().positive().required(),
      Valor:Joi.number().integer().positive().max(Number(Saldo)).required()
    })

    const {error, value} = schema.validate(body)

    if(error) {
      error.message = error.details[0].message
      error.code = 400;
      throw error
    }

    return value
  },
  validateDeposito: async (body) => {
    const schema = Joi.object({
      CodCliente:Joi.number().integer().positive().required(),
      Valor:Joi.number().integer().positive().required()
    })

    const {error, value} = schema.validate(body)

    if(error) {
      error.message = error.details[0].message
      error.code = 400;
      throw error
    }

    return value
  },
  validateSaque: async (body) => {

    try{
      const {Saldo} = await Conta.findByPk(body.CodCliente)
    } catch {
      throw new NotFoundError("Conta não encontrada.")
    }

    const {Saldo} = await Conta.findByPk(body.CodCliente)

    const schema = Joi.object({
      CodCliente:Joi.number().integer().positive().required(),
      Valor:Joi.number().integer().positive().max(Saldo).required()
    })

    const {error, value} = schema.validate(body)

    if(error) {
      error.message = error.details[0].message
      error.code = 400;
      throw error
    }

    return value
  },
  validateConta: async (CodCliente) => {
    const conta = await Conta.findByPk(CodCliente)
    if(!conta) throw new NotFoundError("Conta não encontrada.")
  }
}

module.exports = contaService
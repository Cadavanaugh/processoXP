const {Router} = require('express');
const contaController = require('../controllers/conta');
const auth = require('../middlewares/auth');

const contaRouter = Router();

contaRouter.get('/:CodCliente', contaController.getInfo)
contaRouter.post('/saque', contaController.saque)
contaRouter.post('/deposito', contaController.deposito)

module.exports = contaRouter;

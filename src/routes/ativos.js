const {Router} = require('express');
const AtivosController = require('../controllers/ativo');

const ativosRouter = Router();

ativosRouter.get('/:CodCliente', AtivosController.getAllByClient)
ativosRouter.get('/detail/:CodAtivo', AtivosController.getAsset)

module.exports = ativosRouter;
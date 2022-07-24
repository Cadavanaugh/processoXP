const {Router} = require('express');
const investimentosController = require('../controllers/investimentos');
const auth = require('../middlewares/auth');

const investimentosRouter = Router();

investimentosRouter.post('/comprar', investimentosController.comprar)
investimentosRouter.post('/vender', investimentosController.vender)

module.exports = investimentosRouter;

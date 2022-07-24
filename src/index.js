const express = require('express');
require('express-async-errors');
const buyController = require("./controllers/buy");
const loginController = require('./controllers/login');
const ativosRouter = require('./routes/ativos');
const contaRouter = require('./routes/conta');
const errorMiddleware = require('./middlewares/error');

const app = express();
app.use(express.json());

// app.post('/login', loginController.login)
// app.post('/investimentos/comprar', buyController.create)
app.use('/conta', contaRouter)

app.use(errorMiddleware);

app.listen(process.env.APP_PORT, console.log(`Server running on ${process.env.MYSQL_HOST}:${process.env.APP_PORT}`));
const express = require('express');
require('express-async-errors');
const loginController = require('./controllers/login');
const ativosRouter = require('./routes/ativos');
const investimentosRouter = require('./routes/investimentos');
const contaRouter = require('./routes/conta');
const errorMiddleware = require('./middlewares/error');

const app = express();
app.use(express.json());

app.use('/conta', contaRouter)
app.use('/ativos', ativosRouter)
app.use('/investimentos', investimentosRouter)

app.use(errorMiddleware);

app.listen(process.env.APP_PORT, console.log(`Server running on ${process.env.MYSQL_HOST}:${process.env.APP_PORT}`));
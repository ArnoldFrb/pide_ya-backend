const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(require('./routes/users'));
app.use(require('./routes/pedidos'));
app.use(require('./routes/productos'));
app.use(require('./routes/store'));
app.use(require('./routes/notific'));
app.use(require('./routes/favorite'));
app.use(require('./routes/direction'));

module.exports = app;
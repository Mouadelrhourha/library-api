const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { categoryRouter } = require('./routers/category.router');
const { bookRouter } = require('./routers/book.router');
const { routerUser } = require('./routers/user.router');
const { borrowRouter } = require('./routers/borrow.router');
const { middlewarePassword } = require('./middleware/password');
const { statistiqueRouter } = require('./routers/statistique.router');
const cors = require('cors');

var app = express();
app.use(cors());
app.use(express.json());
app.use(middlewarePassword);

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use('/category',categoryRouter);
app.use('/books',bookRouter);
app.use('/users',routerUser);
app.use('/borrows',borrowRouter);
app.use('/',statistiqueRouter);

module.exports = app;

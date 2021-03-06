const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
var cors = require('cors');
const debug = require('debug')('contact-management-app');

const indexRouter = require('./controllers/indexController');
const contactRouter = require('./controllers/contactController');

//const morganLogFormat = process.env.MORGAN_LOG_FORMAT;
const morganLogFormat=':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms ":referrer" ":user-agent"';

const app = express();

app.use(cors())
app.use(logger(morganLogFormat));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/contact/', contactRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status).json(err.message);
});

module.exports = app;

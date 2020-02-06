const express      = require('express');
const logger       = require('morgan');
const bodyParser   = require('body-parser');
const passport     = require('passport');
const pe           = require('parse-error');
const cors         = require('cors');
const routes       = require('./config/routes');
const models       = require("./models");
const CONFIG       = require('./config/config');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(cors());

app.use('/v0', routes);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;

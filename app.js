const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressJwt = require('express-jwt');
const config = require('config');
const expedienteRouter = require('./routes/expedientes');
const miembroRouter = require('./routes/miembros');
const habilidadRouter = require('./routes/habilidades');
const integranteRouter = require('./routes/integrantes');
const usuarioRouter = require('./routes/usuarios');
const narrativaRouter = require('./routes/narrativas');
const loginRouter = require('./routes/login');
var passport = require('passport');
const i18n = require("i18n");
const methodOverride = require('method-override')

require("./passport")(passport);
const app = express();

i18n.configure({
  locales: ['es', 'en'],
  cookie: 'language',
  directory: __dirname + '/locales',
  defaultLocale:'es'
});



app.use(passport.initialize());
app.use(passport.session());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.init);
app.use(methodOverride('_method'))

const jwtKey = config.get("secret.key");
//app.use(expressJwt({secret:jwtKey}).unless({path:["/login","/usuarios"]}));

//Usuario prueba
/*
{
  "email":"prueba@email.com",
  "password":"1234"
}
*/

app.use('/login', loginRouter);
app.use('/expedientes', expedienteRouter);
app.use('/miembros', miembroRouter);
app.use('/habilidades', habilidadRouter);
app.use('/integrantes', integranteRouter);
app.use('/usuarios', usuarioRouter);
app.use('/narrativas', narrativaRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

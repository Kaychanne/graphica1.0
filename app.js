var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var cors = require('cors');
var formRouter = require('./routes/form'); 
var indexRouter = require('./routes/index'); 
// var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var portofolioRouter = require('./routes/portofolio');
var artikelRouter = require('./routes/artikel');
var layananRouter = require('./routes/layanan');
var app = express();

app.use('/stylesheets', express.static(path.join(__dirname, 'public', 'stylesheets')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());

app.use(session({
  secret: 'your_secret_key', 
  resave: false,
  saveUninitialized: true
}));

app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

app.use('/', indexRouter); 
app.use('/form', formRouter); 
// app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/portofolio', portofolioRouter,);
app.use('/artikel', artikelRouter);
app.use('/layanan', layananRouter);

app.get('/frontend', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/frontend/index.html'));
});

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

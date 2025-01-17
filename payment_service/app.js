var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const paymentsRouter = require('./routes/payments')

const ClientIdValidator = require('./services/client-id-validator')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    // x-client-id
    const clientId = req.headers['x-client-id'];
    console.log('client id - ', clientId)

    if (!clientId) {
        res.status(400).json({message: 'Invalid request'})
        return;
    }

    if (!new ClientIdValidator().validate(clientId)) {
        res.status(400).json({message: 'Invalid request'})
        return;
    }

    next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/payment-service', paymentsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

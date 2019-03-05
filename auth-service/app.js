var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var http = require('http');
var dbConne=require('./dbConnection')
var server = http.createServer(app);
var cors = require('cors');
var func = require('./function')

//routes
var userRoute=require('./routes/user-router')

//port configration
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


// view engine setup
app.use(cors())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth',userRoute)
function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
server.listen(port, () => {
  func.printLog(func.logCons.LOG_LEVEL_INFO, "Server is started on Port Number=>" + port)
});


module.exports = app;

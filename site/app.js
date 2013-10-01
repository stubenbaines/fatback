
/**
 * Module dependencies.
 */

var express = require('express'), 
    routes = require('./routes'),
    map = require('./maproutecontroller'),
    mongoose = require('mongoose'),
    http = require('http'),
    path = require('path'),
    app = express();

// Database connection
mongoose.connect('mongodb://127.0.0.1/QuestionDB');
mongoose.connection.on('open', function() {
    console.log('Connected to Mongoose');
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.directory(__dirname + '/public'));
  app.use(function(req, res, next) {
      throw new Error(req.url + ' not found');
  });
  app.use(function(err, req, res, next) {
      console.log(err);
      res.send(err.message);
  });
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
var prefixes = ['questions'];

// Map route to controller
prefixes.forEach(function(prefix) {
    map.mapRoute(app, prefix);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
  //console.log(app);
});

/**
 * Module dependencies.
 */
require('./lib/db');
var express = require('express'), 
    routes = require('./routes'),
    map = require('./maproutecontroller'),
    http = require('http'),
    path = require('path'),
    auth = require('./lib/auth'),
    passport = auth.passport,
    userController  = require('./controllers/user'),
    app = express(),
    prefixes = ['questions', 'answers'];

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.favicon());
  app.use(express.logger('dev'));
  // User auth.
  app.use(express.cookieParser());
  app.use(express.session({secret: 'flarke'})); // TODO: Move to a param/config.
  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/js/libs', express.static(__dirname + '/bower_components/gumby/js'));
  app.use('/css', express.static(__dirname + '/bower_components/gumby/css'));
  app.use(express.methodOverride());
  app.use(app.router);

  // What is this for? 
  app.use(function(req, res, next) {
      throw new Error(req.url + ' not found');
  });

  // Error handler middleware.
  app.use(function(err, req, res, next) {
      console.log(err);
      res.send(err.message);
  });

  // TODO: app.js is getting too fat. Move routes somewhere else?
  app.get('/', routes.index);

  app.get('/login', function(req, res){
        res.render('user/login', { user: req.user, message: req});
  });

  app.post('/login',
    passport.authenticate('local', { 
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: false 
    }));

    app.get('/register', function(req, res){
        res.render('user/register', {});
    });

    app.post('/register', userController.register);
});
app.configure('development', function(){
  app.use(express.errorHandler());
});

// Map route to controller
prefixes.forEach(function(prefix) {
    map.mapRoute(app, prefix);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


/**
 * Module dependencies.
 */

var express = require('express'), 
	routes = require('./routes'), 
	user = require('./routes/user'), 
	http = require('http'), 
	path = require('path'), 
	mongoose = require('mongoose'), 
	Facebook = require('facebook-node-sdk'), 
	home = require('./routes/home'); 

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(Facebook.middleware({appId: 732147630152590, secret: '3d68e73edc6d942b661f8c2328910c1e'}));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
  mongoose.connect(process.env.MONGOLAB_URI || 'localhost');
});


// setting the scope of the FB login 
global.scope = ['read_friendlists', 'publish_stream', 'friends_location'];

// gets
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/login', Facebook.loginRequired({scope: scope}), user.login);
app.get('/users/delete_all', user.delete_all); 
app.get('/home', Facebook.loginRequired({scope: scope}), home.displayHome);

// posts
app.post('/login', Facebook.loginRequired({scope: scope}), user.login); 

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

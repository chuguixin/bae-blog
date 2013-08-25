 /*
  *
  */
 // title = '随心小筑';
 // subTitle = ''; //
 // password = ''; //password for the admin of your blog
 // author = 'chuguixin';
 // icon = 'favicon.ico';

 /**
  * Module dependencies.
  */
 var siteUrl, imageUrl;
 var express = require('express'),
 	MemcacheStore = require('connect-memcache')(express),
 	routes = require('./routes'),
 	user = require('./routes/user'),
 	http = require('http'),
 	path = require('path');

 var app = express();

 // all environments
 app.set('port', process.env.PORT || 3000);
 app.set('views', __dirname + '/views');
 app.set('view engine', 'jade');
 app.use(express.favicon());
 app.use(express.logger('dev'));
 app.use(express.bodyParser());
 app.use(express.methodOverride());
 app.use(app.router);
 app.use(express.static(path.join(__dirname, 'public')));

 // development only
 if ('development' == app.get('env')) {
 	app.use(express.errorHandler());
 }

 app.get('/', routes.index);
 app.get('/users', user.list);

 http.createServer(app).listen(app.get('port'), function() {
 	console.log('your blog server listening on port ' + app.get('port'));
 });
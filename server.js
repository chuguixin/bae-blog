 /**
  * Module dependencies.
  */
 //var siteUrl, imageUrl;
 var express = require('express'),
 	//   MemcacheStore = require('connect-memcache')(express),
 	db = require('./db'),
 	post_model = db.post,
 	admin = require('./routes/admin'),
 	home = require('./routes/home'),
 	post = require('./routes/post'),
 	http = require('http'),
 	path = require('path'),
 	port = process.env.APP_PORT;

 var app = express();

 // all environments
 app.set('port', port);
 app.set('views', __dirname + '/views');
 app.set('view engine', 'jade');
 app.use(express.logger());
 app.use(express.compress());
 app.use(express.favicon());
 app.use(express.bodyParser());
 app.use(express.methodOverride());
 app.use(app.router);

 // development only
 if ('development' == app.get('env')) {
 	app.use(express.errorHandler());
 }

 app.get('/', home.index);
 app.post('/', home.home_post_handler);

 app.get('/admin/delete', admin.delete);
 app.post('/admin/delete', admin.delete_post_handler);

 app.get('/admin/new', admin.new);
 app.post('/admin/new', admin.new_post_handler);

 app.get('/post/:id/:title', post.post_view);
 app.post('/post/:id/:title', post.post_view_post_handler);

 app.get('/admin', admin.admin_check);
 app.post('/admin', admin.admin_check_post_handler);

 app.get('/admin/:id/edit', admin.admin_edit);
 app.post('/admin/:id/edit', admin.admin_edit_post_handler);

 app.get('/admin/logout', function(req, res) {
 	delete req.session.admin;
 	console.log('admin logged-out at' + (new Date).toLocalDateString())
 	res.redirect('/');
 });

 app.get('/about', function(req, res) {
 	res.render('about', {
 		title: title,
 		subTitle: subTitle,
 		admin: req.session.admin
 	});
 });

 http.createServer(app).listen(app.get('port'), function() {
 	console.log('your blog server listening on port ' + app.get('port'));
 });
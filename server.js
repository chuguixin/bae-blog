 /*
 *
 */
 title = '随心小筑';
 subTitle = ''
 password = '356256384.sx';
 author = 'chuguixin';
 icon = 'favicon.ico';

/**
 * Module dependencies.
 */
var siteUrl, imageUrl;
var express = require('express')
  , MemcacheStore = require('connect-memcache')(express)
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

//use mongoos operating mongodb
var mongoose = require('mongoose');
var Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;
var db_name = 'WZUaEmHEHLIsuOxrzFlI';                  // 数据库名，从云平台获取
var db_host =  process.env.BAE_ENV_ADDR_MONGO_IP;      // 数据库地址
var db_port =  +process.env.BAE_ENV_ADDR_MONGO_PORT;   // 数据库端口
var username = process.env.BAE_ENV_AK;                 // 用户名
var password = process.env.BAE_ENV_SK;                 // 密码

var db = mongoose.connect(db_host + db_port + db_name).connection;


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

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

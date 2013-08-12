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

//The MongoDB Schema for posts

var postSchema = new Schema({
    id: ObjectId,
    title: { type: String },
    title_sub: { type: String },
    content: { type: String },
    date: { type: String }
})

//The MongoDB Schema for each post's comments
var commentSchema = new Schema({
	id: ObjectId,
	postid: { type: String },
    title_sub: { type: String },
	name: { type: String },
	comment: { type: String },
	date: { type: String }
})

var post = db.model('post', postSchema);
var comment = db.model('comment', commentSchema);

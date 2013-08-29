//use mongoos operating mongodb
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


var db_name = ''; //Provided by BAE 
var db_host = process.env.BAE_ENV_ADDR_MONGO_IP; // 数据库地址
var db_port = +process.env.BAE_ENV_ADDR_MONGO_PORT; // 数据库端口
var username = process.env.BAE_ENV_AK; // 用户名
var password = process.env.BAE_ENV_SK; // 密码

var db_url = db_host + db_port + db_name;
var db = mongoose.connect(db_url);

var dbConection = mongoose.connection;
dbConection.on('error', function() {
    console.error('mongodb connection error:')
});
// db.once('open', function callback () {
//   // yay!
// });

//The MongoDB Schema for posts

var postSchema = new Schema({
    id: ObjectId,
    title: {
        type: String
    },
    title_sub: {
        type: String
    },
    content: {
        type: String
    },
    date: {
        type: String
    },
    meta: {
        votes: Number,
        favs: Number
    },
    //定义文章的类目
    classification: {
        type: String
    }
})

//The MongoDB Schema for each post's comments
var commentSchema = new Schema({
    id: ObjectId,
    postid: {
        type: String
    },
    title_sub: {
        type: String
    },
    name: {
        type: String
    },
    comment: {
        type: String
    },
    date: {
        type: String
    },
    //默认情况，评论不经过博主审核，不予以公开
    hidden: {
        type: Boolean,
        default: true
    }
})

exports.post = db.model('post', postSchema);
exports.comment = db.model('comment', commentSchema);
//index router
var blogConfig = require('../blogConfig'),
    mongoose = require('mongoose'),
    db = require('../db'),
    post = db.post,
    title = blogConfig.title,
    subTitle = blogConfig.subTitle;

//index
exports.index = function(req, res) {

    post.find({}).sort('-_id').execFind(function(err, posts) {
        if (posts) {
            res.render('index', {
                title: title,
                subTitle: subTitle,
                posts: posts,
                admin: req.session.admin
            });
        } else {
            res.render('index', {
                title: title,
                subTitle: subTitle,
                posts: null,
                admin: req.session.admin
            })
        }
    });

};

//you can do what you want to do
exports.home_post_handler = function(req, res) {

}
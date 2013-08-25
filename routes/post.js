//post router
//PREREQUISITES
var mongoose = require('mongoose');
var db = require('../db');
var post = db.post;
var commentss = db.comment;
var date = new Date();
var blogConfig = require('../blogConfig');

//Single post view
exports.post_view = function(req, res) {

	var id = req.params.id;
	post.find({
		'_id': id
	}, function(err, post) {
		if (post) {
			commentss.find({
				'postid': id
			}, function(err, comment) {
				if (comment) {
					res.render('post_view', {
						title: title,
						subTitle: subTitle,
						post: post,
						comment: comment,
						admin: req.session.admin
					})
				} else {
					res.render('post_view', {
						title: title,
						subTitle: subTitle,
						post: post,
						comment: null,
						admin: req.session.admin
					})
				}
			});

		} else {
			res.render('post_view', {
				title: title,
				subTitle: subTitle,
				post: null,
				comment: null,
				admin: req.session.admin
			})
		}
	});
}

exports.post_view_post_handler = function(req, res) {
	var id = req.params.id;
	var title_sub = req.params.title;
	var classification = req.params.classification;
	var name = req.body.name || blogConfig.comment.defaultName || '“无名”子';
	var comment = req.body.comment || blogConfig.comment.defaultComment || '天空没有留下鸟的痕迹，但我已经飞过。';
	console.log(name + ' said ' + comment);
	console.log(id);


	//specific time
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();

	//date
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	var day = date.getDate();


	//organize time so it looks nice
	var time = year + '-' + month + '-' + day + ' at ' + hours + ':' + minutes + ':' + seconds;


	//Submitting to database
	var newComment = commentss({
		postid: id,
		title_sub: title_sub,
		name: name,
		comment: comment,
		date: time,
		meta: {
			votes: 0,
			favs: 0
		},
		classification: classification
	});
	newComment.save();

	//redirecting to homepage
	res.redirect('/post/' + id + '/' + title_sub);
}
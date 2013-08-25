//admin router
var mongoose = require('mongoose');
var db 		 = require('../db');
var post = db.post;
var error;
var date 	 = new Date();
var blogConfig = require('../blogConfig');
var title = blogConfig.title,
    subTitle = blogConfig.subTitle;
//
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

//new post functions
exports.new = function(req, res){
  if(req.session.admin == 'true'){
    post.find({}).sort('-_id').execFind(function(err, posts){
      if(posts){
        res.render('admin', { title: title, subTitle:subTitle, posts:posts, admin:req.session.admin});
      }else{
        res.render('admin', { title: title, subTitle:subTitle, posts:null, admin:req.session.admin })
      }
    });    
  }else{
    res.redirect('/') 
  }

};
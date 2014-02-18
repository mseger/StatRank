var User = require('../models/user')
var async = require('async')

exports.displayHome = function(req, res){
	var allGroups = [];
	var currUser = User.findOne({name: req.session.user.name}).populate(['friends']).exec(function (err, user){
		if(err)
			console.log("Unable to display user's home: ", err);
		console.log("Successfully found this user! ", currUser);
		res.render('home', {curr_user: user, title: 'Home', friends: user.friends}); 
	});
}


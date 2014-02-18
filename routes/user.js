var User = require('../models/user')

// login a new user, start a new session
exports.login = function (req, res) {
  req.facebook.api('/me', function(err, data){
  	req.facebook.api('/me/friends?fields=id,name,location', function(err, friendData){
  		req.facebook.api('/me/picture?redirect=false&type=large', function(err, picData){
	  		var existentUser = User.findOne({name: data.name}, function (err, user){
	  			if(user){
	  				req.session.user = user;
	  				res.redirect('/home');
		  		}else{
		  			var loggedInUser = new User({name: data.name, profPicURL: picData.data.url, location: data.location, friends: friendData.data});
		  			
		  			// need to use async here to make a User for each of the friends in the friend data blob
		  			console.log("The friend blob we're getting is: ", friendData); 

		  			loggedInUser.save(function (err){
			  			if(err)
			  				console.log("Unable to save new user.");
			  		 	req.session.user = loggedInUser; 
			  			res.redirect('/home');
		  			});
		  		}
		  	});
	  	});
  	});
  });
};

// delete all users
exports.delete_all = function(req, res){
	// clears out your list so you can start from scratch
	User.remove({}, function(err) { 
   		console.log('user collection removed');
   		res.redirect('/');
	});
};

exports.list = function(req, res){
  res.send("respond with a resource");
};
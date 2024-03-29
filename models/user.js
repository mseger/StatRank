var mongoose = require('mongoose'), Schema = mongoose.Schema

var UserSchema = new Schema({
	name: String, 
	profPicURL: String, 
	location: String, 
	friends: []
});

var User = mongoose.model('User', UserSchema);

module.exports = User; 
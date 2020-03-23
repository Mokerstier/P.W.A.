const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({

	email: {
		type: String,
		lowercase: true,
		required: [true, "can't be blank"],
		match: [/\S+@\S+\.\S+/, "is invalid"],
		index: true,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	nickName: {
		type: String,
		lowercase: true,
		required: [true, 'can\'t be blank'],
		index: true,
		required: true
	},
    steamID:{
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
		index: true,
		required: true
    },
    dotaID: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
		index: true,
		required: true
    }
});
userSchema.pre("save", function(next) {
	var user = this;
	if (!user.isModified("password")) return next();
	bcrypt.hash(user.password, 10, function(err, hash) {
		if (err) {
			return next(err);
		}
		user.password = hash;
		next();
	});
});


userSchema.plugin(uniqueValidator);
//  , {message: 'is already taken.'}

exports.userSchema = mongoose.model("user", userSchema);
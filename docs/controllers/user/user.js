const { userSchema } = require("../models/user");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.post("/", urlencodedParser, async (req, res) => {
	const { body } = req;
	// Check if this user already exisits
	let user = await userSchema.findOne({ email: body.email });
	if (user) {
		return res.status(400).send("That user already exisits!");
	} else {
		// Insert the new user if they do not exist yet
		user = new userSchema({
			firstName: body.firstName,
			lastName: body.lastName,
			email: body.email,
			password: body.password,

		});

		await user.save();

		res.redirect("/");
	}
});

module.exports = router;
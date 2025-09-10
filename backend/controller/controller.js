const { User, Post } = require("../schema/Schema");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
//jwt

// posts
module.exports.get_posts = async (req, res) => {
	const posts = await Post.find();
	res.json(posts);
};

//login
module.exports.post_login = async (req, res) => {
	const { username, password } = req.body;
	const isExist = await User.findOne({
		username
	});
	if (isExist) {
		const isMatch = await bcrypt.compare(password, isExist.password);
		if (isMatch) {
			const token = jwt.sign(
				{
					id: isExist.id,
					username: isExist.username,
					niveau: isExist.niveau
				},
				process.env.SECRET_JWT,
				{ expiresIn: "1h" }
			);

			res.json({ token, msg: "happy login !" });
		} else {
			res.json({
				yourError: { password: "كلمة المرور خاطئة !" },
				msg: "password is incorrect"
			});
		}
	} else {
		res.json({
			yourError: { username: "اسم المستخدم غير موجود" },
			msg: "this username is dosn't exist"
		});
	}
	console.log(isExist);
};

//signup
module.exports.post_signup = async (req, res) => {
	if (!req.body.username || !req.body.password) {
		res.json({ msg: "no data available" });
		return;
	}
	await User.findOneAndDelete({ username: "ali" });
	const isExistUser = await User.findOne({ username: req.body.username });
	console.log(isExistUser);
	console.log("$$$$$$$$$");
	const usersa = await User.find();
	console.log(usersa);
	console.log("$$$$$$$$$");
	if (isExistUser) {
		console.log("is there");
		res.json({
			yourError: { username: "هذا الإسم مستخدم بالفعل، جرب اخر" },
			msg: "this username alerdy taken"
		});
		return;
	} else {
		console.log("dost exist");

		const { username, password, gender, niveau } = req.body;

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			username,
			password: hashedPassword,
			gender,
			niveau
		});

		await newUser.save();

		const users = await User.find();
		console.log(users);
		res.json({ msg: "regester" });
	}
};

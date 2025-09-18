const { User, Post } = require("../schema/Schema");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
//jwt

/*
app.get("/protected", (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");
    res.json({ message: "Access granted", user: decoded });
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
});
*/

const isProduction = process.env.NODE_ENV === "production";

// posts
module.exports.get_posts = async (req, res) => {
	const postss = await Post.find();
	console.log(postss);
	const posts = [
		{
			id: 1010998,
			createdAt: "2009",
			author: "ana",
			content: "helllo world"
		},
		{
			id: 10198760998,
			createdAt: "2009",
			author: "ana",
			content: "helllo world"
		}
	];
	postss.length > 0
		? res.status(200).json(postss)
		: res.status(200).json(posts);
};

module.exports.post_posts = async (req, res) => {
	console.log("the api is pass from here : post posts first line");
	const user = req.user;
	const content = req.body;
	const newPost = new Post({
		authour: user.username,
		description: content
	});
	await newPost.save();
	let sds = await Post.find();
	console.log(sds);
	res.status(201).json({ pMsg: "تم النشر بنجاح !" });
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
					username: isExist.username
				},
				process.env.SECRET_JWT,
				{ expiresIn: "1h" }
			);

			res.cookie("token", token, {
				httpOnly: false,
				secure: isProduction,
				sameSite: isProduction ? "none" : "lax",
				maxAge: 1000 * 60 * 60 * 24
			});

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

		const token = jwt.sign(
			{
				id: newUser.id,
				username: newUser.username
			},
			process.env.SECRET_JWT,
			{ expiresIn: "24h" }
		);
		res.cookie("token", token, {
			httpOnly: false,
			secure: isProduction,
			sameSite: isProduction ? "none" : "lax",
			maxAge: 1000 * 60 * 60 * 24
		});

		const users = await User.find();
		console.log(users);
		res.json({ msg: "regester" });
	}
};

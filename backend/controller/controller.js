const { User, Post } = require("../schema/Schema");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const isProduction = process.env.NODE_ENV === "production";

// ===== init fonction ========
let io;
module.exports.init = socketIo => {
	io = socketIo;
};
// ===== init fonction ========

// posts
module.exports.get_posts = async (req, res) => {
	const postss = await Post.find();
	const posts = [
		{
			id: "2b",
			createdAt: "2009/10/18",
			authour: "$from The Server !",
			content:
				"عذرا، لا توجد منشورات حتى الان عد لاحقا او كن اول من ينشر",
			whoLiked: []
		}
	];
	res.status(200).json(postss.length > 0 ? postss : posts);
};
//post posts
module.exports.post_posts = async (req, res) => {
	const user = req.user;
	console.log("999999999: " + JSON.stringify(user));
	const { content } = req.body;
	const newPost = new Post({
		authour: user.username,
		description: content
	});
	console.log("11111111" + JSON.stringify(newPost));
	await newPost.save();
	ewait(Post, "posts length");
	res.status(201).json({ pMsg: "تم النشر بنجاح !" });
};
//put post
module.exports.put_post_like = async (req, res) => {
	console.log("heeeeere in put post like ");
	const userId = req.user.id;
	const postId = req.params.id;
	const post = await Post.findById(postId);
	console.log(userId, postId, post);
	if (!post) {
		return res.status(404).json({ error: "Post not found" });
	}

	let updateQuery;
	if (post.whoLiked.includes(userId)) {
		updateQuery = { $pull: { whoLiked: userId } };
	} else {
		updateQuery = { $addToSet: { whoLiked: userId } };
	}

	// 👇 هنا نحصل على النسخة المحدثة مباشرة
	const updatedPost = await Post.findByIdAndUpdate(postId, updateQuery, {
		new: true
	});

	if (io) {
		io.emit("likesUpdate", {
			postId: updatedPost._id,
			likes: updatedPost.whoLiked.length
		});
	}

	res.json(updatedPost);
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
				{ expiresIn: "24h" }
			);
			// 	res.cookie("token", token, {
			// 		httpOnly: true,
			// 		secure: true,
			// 		sameSite: "none",
			// 		maxAge: 1000 * 60 * 60 * 24
			// 	});
			res.status(200).json({ token, msg: "happy login !" });
		} else {
			res.status(400).json({
				yourError: { password: "كلمة المرور خاطئة !" },
				msg: "password is incorrect"
			});
		}
	} else {
		res.status(400).json({
			yourError: { username: "اسم المستخدم غير موجود" },
			msg: "this username dosn't exist"
		});
	}
	ewait(User, "users length");
};

//signup
module.exports.post_signup = async (req, res) => {
	const isExistUser = await User.findOne({ username: req.body.username });
	const users = await User.find();
	if (isExistUser) {
		return res.status(400).json({
			yourError: { username: "هذا الإسم مستخدم بالفعل، جرب اخر" },
			msg: "this username alerdy taken"
		});
	}
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
	// res.cookie("token", token, {
	// 	httpOnly: true,
	// 	secure: true,
	// 	sameSite: "none",
	// 	maxAge: 1000 * 60 * 60 * 24
	// });
	ewait(User, "users length");
	res.status(201).json({ token, msg: "regester" });
};

async function ewait(m, msg) {
	const w = await m.find();
	return console.log(`${msg}: ${w.length}`);
}

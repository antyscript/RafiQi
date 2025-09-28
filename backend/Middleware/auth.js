// middlewares/auth.js
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
	const authHeader = req.headers.authorization;
	if (!authHeader) return res.status(401).send("Unauthorized");

	const token = authHeader.split(" ")[1];
	try {
		const user = jwt.verify(token, process.env.SECRET_JWT);
		req.user = user;
		console.log(
			`this is user: \n${user} \n and this js token: \n ${token}`
		);
		next();
	} catch (err) {
		res.status(403).json({
			msg: "توكن غير صالح او تم التلاعب به !"
		});
	}
}
module.exports = verifyToken;

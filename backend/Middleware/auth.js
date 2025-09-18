// middlewares/auth.js
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
	const infos = {
		body: req.body,
		method: req.method,
		url: req.url,
		headers: req.headers,
		query: req.query
	};
	console.log(
		"the api is pass from here : authMiddleware first line this is req : \n" +
			JSON.stringify(infos)
			+ "\n and this is headers.cookie = " + req.headers.cookie
	);
	const token = req.cookies.token;
	console.log("this is re.cookies : " + JSON.stringify(req.cookies));
	console.log(
		"the api is pass from here : tokenize, and thisis the token : " + token
	);
	if (!token) {
		return res.status(401).json({ pMsg: "غير مسجل الدخول !" });
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET_JWT);
		req.user = decoded;
		console.log(
			"the api is pass from here : decode the token, and this is formations : " +
				decode
		);
		next();
	} catch (err) {
		return res.status(401).json({ pMsg: "توكن غير صالح او تم التلاعب به" });
	}
}

module.exports = authMiddleware;

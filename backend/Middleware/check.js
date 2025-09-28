function check(option) {
	return function checkUser(req, res, next) {
		if (!req.body.username || !req.body.password) {
			return res.status(400).json({
				yourError: { username: "تحقق من ادخال اسم المستخدم وكلمة السر" }
			});
		}
		if (option !== "login"){
		  
		if (req.method === "POST" && (!req.body.gender || !req.body.niveau)) {
			return res.status(400).json({
				yourError: { username: "تحقق من ادخال الجنس والمستوى كذلك" }
			});
		}
		}
		const un = req.body.username; //un => UserName
		const ps = req.body.password; //ps => password
		if (ps.length < 6) {
			return res.status(400).json({
				yourError: { password: "كلمة المرور قصيرة جدا !" }
			});
		}
		if (!/^[a-z0-9_]+$/.test(un) || un.length > 20 || un.length < 3) {
			return res.status(400).json({
				yourError: {
					username: "استخدم حروفا ورموز صالحة وطول مناسب للاسم"
				}
			});
		}

		next();
	};
}

module.exports = check;

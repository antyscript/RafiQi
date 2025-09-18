const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const isProduction = process.env.NODE_ENV === "production";

const routes = require("./routes/routes");

// إعداد CORS
const corsOptions = {
	origin: isProduction
		? "https://rafiqi.vercel.app"
		: "http://localhost:5173",
	credentials: true
};
app.use(cors(corsOptions));

// تحليل JSON والكوكيز
app.use(express.json());
app.use(cookieParser());

// static files
app.use(express.static("public"));

// routes
app.use(routes);

// الاتصال بقاعدة البيانات وتشغيل السيرفر
mongoose
	.connect(process.env.MNG_URL)
	.then(() =>
		app.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`);
			console.log("NODE_ENV =", process.env.NODE_ENV);
		})
	)
	.catch(err => console.log(err));

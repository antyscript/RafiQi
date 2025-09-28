const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const isProduction = process.env.NODE_ENV === "production";

//const fs = require("fs");
//const https = require("https");
/*const sslOptions = {
	key: fs.readFileSync("../cert/localhost-key.pem"),
	cert: fs.readFileSync("../cert/localhost.pem")
};*/

//========= server http zone =========
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const Controller = require("./controller/controller.js");

Controller.init(io);
//========= server http zone =========

const routes = require("./routes/routes");

const corsOptions = {
	origin: isProduction ? "https://rafiqi.vercel.app" : "http://localhost:5173"
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
//app.use(express.static("public"));
// routes
app.use(routes);

mongoose
	.connect(process.env.MNG_URL)
	.then(() => {
		/*	app.listen(PORT, () => {
			console.log(`Server running on https://localhost:${PORT}`);
						console.log("NODE_ENV : " + process.env.NODE_ENV);

	})
			*/
		server.listen(PORT, () => {
			console.log("Serveur en écoute sur " + PORT);
			console.log("NODE_ENV : " + process.env.NODE_ENV);
		});
	})
	.catch(err => console.log(err));

require("dotenv").config();
const mongoose = require("mongoose");

const connect = () => {
	const opt = {
		dbName: "radio-station",
	};
	console.log("starting to connect to mongo ...");
	mongoose.connect(process.env.MONGO_URL, opt);
	const db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error:"));
	db.once("open", function callback() {
		console.log("connected to mongo");
	});
};

module.exports = {
	connect,
};

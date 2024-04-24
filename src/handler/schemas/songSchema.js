const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
	id: Number,
	title: String,
	artist: String,
	duration: String,
});

module.exports = mongoose.model("song", songSchema);

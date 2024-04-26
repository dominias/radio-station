const mongoose = require("mongoose");

const timeslotSchema = new mongoose.Schema({
	id: String,
	day: String,
	time: String,
	dj: {
		id: Number,
		name: String,
	},
	taken: Boolean,
	songs: [
		{
			id: Number,
			title: String,
			artist: String,
			duration: String,
		},
	],
});

module.exports = mongoose.model("timeslot", timeslotSchema);

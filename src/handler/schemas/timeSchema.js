const mongoose = require("mongoose");

// const timeslotSchema = new mongoose.Schema({
// 	id: String,
// 	day: String,
// 	time: String,
// 	dj: {
// 		id: Number,
// 		name: String,
// 	},
// 	taken: Boolean,
// 	songs: [
// 		{
// 			id: Number,
// 			title: String,
// 			artist: String,
// 			duration: String,
// 		},
// 	],
// });

const timeSchema = new mongoose.Schema({
	id: Number,
	week: String,
	dates: [
		{
			number: Number,
			timeslots: [
				{
					id: String,
					dj: Number,
					listId: Number,
					day: String,
					time: String,
					taken: Boolean,
				},
			],
		},
	],
});

module.exports = mongoose.model("time", timeSchema);

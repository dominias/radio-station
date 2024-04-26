const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
	id: Number,
	name: String,
	songs: [{ recid: Number }],
});

module.exports = mongoose.model("list", listSchema);

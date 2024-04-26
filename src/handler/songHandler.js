const songsModel = require("./schemas/songSchema"); // songs collection database
const timeslotsModel = require("./schemas/timeslotSchema"); // dj collection database

// Initial Fetch
const initSongs = async () => {
	let songs = [];
	await songsModel
		.find()
		.sort("title artist")
		.then((data) => {
			songs = data;
		})
		.catch((err) => {
			console.log(err);
		});
	// remove ' from songs
	songs.forEach((song, i) => {
		songs[i] = {
			id: song.id,
			title: song.title.replace(new RegExp("'", "g"), ""),
			artist: song.artist.replace(new RegExp("'", "g"), ""),
			duration: song.duration,
		};
	});
	return songs;
};

// fetches songs from timeslot id
const getSongsFromPlaylist = (app) => {
	app.get("/api/timeslot/:id", (req, resp) => {
		timeslotsModel.findOne({ id: req.params.id }).then((data) => {
			if (data !== null) {
				resp.json(data.songs);
			}
		});
	});
};

const querySongList = (app) => {
	app.get("/api/searchSongs", (req, resp) => {
		const query = req.query.q;
		const regex = new RegExp(query, "i");
		songsModel
			.find({
				$or: [
					{ title: { $regex: regex } },
					{ artist: { $regex: regex } },
				],
			})
			.sort("title artist")
			.then((res) => {
				resp.render("partials/songList.ejs", {
					songs: res,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	});
};

const addSongToPlaylist = (app) => {
	app.post("/api/timeslot/:id/addSong", async (req, resp) => {
		const doc = await timeslotsModel.findOne({
			id: req.params.id,
			songs: {
				$not: {
					$elemMatch: req.body,
				},
			},
		});
		if (doc !== null) {
			doc.songs.push(req.body);
			await doc.save();
			resp.json(doc.songs);
		}
	});
};

const removeSongFromPlaylist = (app) => {
	app.delete("/api/timeslot/:id/deleteSong", async (req, resp) => {
		const doc = await timeslotsModel.findOneAndUpdate(
			{ id: req.params.id },
			{ $pull: { songs: { id: req.query.id } } },
			{ new: true }
		);
		resp.json(doc.songs);
	});
};

module.exports = {
	initSongs,
	getSongsFromPlaylist,
	querySongList,
	addSongToPlaylist,
	removeSongFromPlaylist,
};

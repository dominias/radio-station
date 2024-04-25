const songsCollection = require("./schemas/songSchema"); // songs collection database
const timeslotsModel = require("./schemas/timeslotSchema"); // dj collection database

// Initial Fetch
const initSongs = async () => {
	let songs = [];
	await songsCollection
		.find()
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
	return songs.sort(songComparison);
};

// for later use when fetching again from DB of timeslot
const getSongsFromPlaylist = (app) => {
	app.get("/api/timeslot/:id", (req, resp) => {
		timeslotsModel.findOne({ id: req.params.id }).then((data) => {
			if (data !== null) {
				resp.render("partials/playlistSongs.ejs", {
					playlist: data.songs,
				});
			}
		});
	});
};

const querySongList = (app) => {
	app.get("/api/searchSongs", (req, resp) => {
		const query = req.query.q.toLowerCase();

		// Filter the songs based on the search query
		const filteredSongs = songs.filter((song) => song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query));
		filteredSongs.sort(songComparison);
		resp.render("partials/songList.ejs", {
			songs: filteredSongs,
		});
	});
};

const addSongToPlaylist = (app) => {
	app.post("/api/timeslot/:id/addSong", (req, resp) => {
		const newSong = req.body;
		const idToFind = req.params.id;
		const foundTimeslot = timeslotDB.getData().find((timeslot) => timeslot.id === idToFind);
		// If song already in playlist
		if (
			foundTimeslot.songs.some((song) => {
				return song.title === newSong.title && song.artist === newSong.artist;
			})
		) {
			return;
		}
		foundTimeslot.songs.push(newSong);
		resp.render("partials/playlistSongs.ejs", {
			playlist: foundTimeslot.songs,
		});
	});
};

function songComparison(songA, songB) {
	if (songA.title.toLowerCase() < songB.title.toLowerCase()) {
		return -1;
	}
	if (songA.title.toLowerCase() > songB.title.toLowerCase()) {
		return 1;
	}
	if (songA.artist.toLowerCase() < songB.artist.toLowerCase()) {
		return -1;
	}
	if (songA.artist.toLowerCase() > songB.artist.toLowerCase()) {
		return 1;
	}
	return 0;
}

module.exports = {
	initSongs,
	getSongsFromPlaylist,
	querySongList,
	addSongToPlaylist,
};

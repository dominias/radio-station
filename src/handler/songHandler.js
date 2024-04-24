const songs = require("./schemas/songs.json");
const timeslotDB = require("./schemas/timeslotDB");

// Initial Fetch
const initSongs = () => {
	// get data from company provider
	songs.sort(songComparison);
	songs.forEach((song, i) => {
		songs[i] = { title: song.title.replace(new RegExp("'", "g"), ""), artist: song.artist.replace(new RegExp("'", "g"), "") };
	});
	return songs.sort(songComparison);
};

// for later use when fetching again from DB of timeslot
const getSongsFromPlaylist = (app) => {
	app.get("/api/timeslot/:id", (req, resp) => {
		const idToFind = req.params.id;
		const foundTimeslot = timeslotDB.getData().find((timeslot) => timeslot.id === idToFind);
		if (foundTimeslot !== undefined) {
			resp.render("partials/playlistSongs.ejs", {
				playlist: foundTimeslot.songs,
			});
		}
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
		const newSong = { title: req.query.title, artist: req.query.artist };
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

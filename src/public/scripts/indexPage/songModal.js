import {
	renderSongElements,
	removeSongElements,
} from "../../util/renderUtil.js";

class SongModal {
	constructor() {
		this.timeslot = null;
	}

	openSongModal(timeslot) {
		// if different timeslot, rerender
		if (this.timeslot !== timeslot) {
			const songModalPlaylist = document.querySelector(
				".song-playlist-songs"
			);
			if (this.timeslot !== null) {
				// remove prev timeslot songs
				removeSongElements(songModalPlaylist, this.timeslot);
			}
			// render new timeslot songs
			renderSongElements(songModalPlaylist, timeslot);
		}
		this.timeslot = timeslot;
		document.querySelector(".song-modal").style.display = "flex";
	}

	closeSongModal(e) {
		if (
			e.target === document.querySelector(".song-modal") ||
			e.target === document.querySelector(".songs-section button")
		) {
			// // remove songs from songModal
			// const playlistSongModalElement = document.querySelector(
			// 	".song-playlist-songs"
			// );
			// playlistSongModalElement.innerHTML = "";
			document.querySelector(".song-modal").style.display = "none";
		}
	}

	handleFinishClick(e) {
		if (e.target === document.querySelector(".songs-section button")) {
			this.closeSongModal(e);
			window.TimeslotModal.openTimeSlotModal(this.timeslot);
		}
	}
}

let debounceTimeout;

document.addEventListener("DOMContentLoaded", () => {
	window.SongModal = new SongModal();

	// query for searching
	const searchInput = document.querySelector(".search-bar");
	searchInput.addEventListener("input", () => {
		const query = searchInput.value;
		clearTimeout(debounceTimeout);
		debounceTimeout = setTimeout(() => {
			fetch(`/api/searchSongs?q=${query}`)
				.then((response) => response.text())
				.then((html) => {
					document
						.querySelectorAll(".songs-list")
						.forEach((songList) => {
							songList.innerHTML = html;
						});
				});
		}, 300);
	});
});

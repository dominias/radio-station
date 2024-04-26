import renderSongElements from "../../util/renderUtil.js";

class SongModal {
	constructor() {
		this.songs = []; // shown songs on playlist
		this.timeslot = null;
	}

	openSongModal(timeslot) {
		this.timeslot = timeslot;
		this.songs = timeslot.songs;
		renderSongElements(
			document.querySelector(".song-playlist-songs"),
			this.timeslot
		);
		// document
		// 	.querySelector(".song-playlist-songs")
		// 	.childNodes.forEach((song) => {
		// 		song.addEventListener("click", async () => {
		// 			await fetch(
		// 				`/api/timeslot/${this.timeslot.id}/deleteSong?id=${song.dataset.id}`,
		// 				{ method: "DELETE" }
		// 			)
		// 				.then((response) => {
		// 					return response.json();
		// 				})
		// 				.then((songs) => {
		// 					console.log(html);
		// 					document.querySelector(
		// 						".song-playlist-songs"
		// 					).innerHTML = html;
		// 				});
		// 		});
		// 	});

		document.querySelector(".song-modal").style.display = "flex";
	}

	closeSongModal(e) {
		if (
			e.target === document.querySelector(".song-modal") ||
			e.target === document.querySelector(".songs-section button")
		) {
			// remove songs from songModal
			const playlistSongModalElement = document.querySelector(
				".song-playlist-songs"
			);
			this.timeslot.songs.forEach((song) => {
				const songElem = playlistSongModalElement.querySelector(
					`[data-id='${song.id}']`
				);
				if (songElem !== null) {
					playlistSongModalElement.removeChild(songElem);
				}
			});
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

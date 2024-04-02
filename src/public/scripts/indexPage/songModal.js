class SongModal {
	constructor() {
		this.songs = []; // shown songs on playlist
		this.timeslot = null;
	}

	openSongModal(timeslot) {
		this.timeslot = timeslot;
		this.songs = timeslot.songs;
		document.querySelector(".song-modal").style.display = "flex";
	}

	closeSongModal(e) {
		if (e.target === document.querySelector(".song-modal") || e.target === document.querySelector(".songs-section button")) {
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

	const searchInput = document.querySelector(".search-bar");
	searchInput.addEventListener("input", () => {
		const query = searchInput.value;
		clearTimeout(debounceTimeout);
		debounceTimeout = setTimeout(() => {
			fetch(`/api/searchSongs?q=${query}`)
				.then((response) => response.text())
				.then((html) => {
					document.querySelectorAll(".songs-list").forEach((songList) => {
						songList.innerHTML = html;
					});
				});
		}, 300);
	});
});

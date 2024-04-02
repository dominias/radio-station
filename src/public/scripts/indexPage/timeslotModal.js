class TimeslotModal {
	constructor() {
		this.timeslot = null; // window shows current timeslot
	}

	// when opening timeslot modal, need to update the profile icon and name
	openTimeSlotModal(timeslot) {
		this.timeslot = timeslot;
		// // Used to dynamically update the songs and active DJ on the modal
		this.setPlaylistSongs(timeslot);
		this.setTimeslotDJ(timeslot.DJ);
		document.querySelector(".timeslot-modal").style.display = "flex";
	}

	closeTimeSlotModal(e) {
		if (
			e.target === document.querySelector(".timeslot-modal") ||
			e.target === document.querySelector(".change-dj") ||
			e.target === document.querySelector(".add-song-button")
		) {
			document.querySelector(".timeslot-modal").style.display = "none";
		}
	}

	// Sets Playlist information
	async setPlaylistSongs(timeslot) {
		await fetch(`/api/timeslot/${timeslot.id}`)
			.then((response) => response.text())
			.then((html) => {
				document.querySelector(".timeslot-playlist-songs").innerHTML =
					html +
					`                                    <button
				class="add-song-button"
				onclick="window.TimeslotModal.handleAddSongClick(event)">+
				add
				song</button>`;
				document.querySelector(".song-playlist-songs").innerHTML = html;
			});
	}

	// Sets DJ information
	setTimeslotDJ(DJ) {
		document.querySelector(".timeslot-overview-section .icon").textContent = DJ.name.slice(0, 2).toUpperCase();
		document.querySelector(".timeslot-overview-section .name").textContent = DJ.name;
	}

	// Change DJ button on timeslot modal
	changeDJ(e) {
		this.closeTimeSlotModal(e);
		window.DJModal.openAssignDJModal(this.timeslot);
	}

	handleAddSongClick(e) {
		this.closeTimeSlotModal(e);
		window.SongModal.openSongModal(this.timeslot);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	window.TimeslotModal = new TimeslotModal();
});

class TimeslotModal {
	constructor() {
		this.timeslot = null; // window shows current timeslot
	}

	// when opening timeslot modal, need to update the profile icon and name
	openTimeSlotModal(timeslot) {
		this.timeslot = timeslot;
		// // Used to dynamically update the songs and active DJ on the modal
		// this.setPlaylistSongs(timeslot.songs);
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

	// setPlaylistSongs(songs) {

	// }

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

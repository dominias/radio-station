function openTimeSlotModal() {
	document.querySelector(".timeslot-modal").style.display = "flex";
}

function closeTimeSlotModal(e) {
	if (e.target === document.querySelector(".timeslot-modal") || e.target === document.querySelector(".change-dj")) {
		document.querySelector(".timeslot-modal").style.display = "none";
	}
}

function changeDJ(e) {
	closeTimeSlotModal(e);
	openAssignDJModal();
}

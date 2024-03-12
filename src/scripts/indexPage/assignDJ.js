class DJs {
	constructor(name) {
		this.name = name;
	}

	render() {
		const elem = document.createElement("div");
	}
}
function openAssignDJModal(e) {
	document.querySelector(".assign-dj-modal").style.display = "flex";
}
function closeAssignDJModal(e) {
	const DJcontainers = document.querySelectorAll(".dj-container");
	if (e.target === document.querySelector(".assign-dj-modal")) {
		document.querySelector(".assign-dj-modal").style.display = "none";
	} else {
		DJcontainers.forEach((DJcontainer) => {
			if (e.target === DJcontainer) {
				document.querySelector(".assign-dj-modal").style.display = "none";
				return;
			}
		});
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const DJcontainers = document.querySelectorAll(".dj-container");
	DJcontainers.forEach((DJcontainer) => {
		DJcontainer.addEventListener("click", (e) => {
			closeAssignDJModal(e);
			openTimeSlotModal();
		});
	});
});

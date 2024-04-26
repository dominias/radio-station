class DJ {
	constructor(id, name, elem) {
		this.id = id;
		this.name = name;
		this.elem = elem;
		const iconNode = document.querySelector(
			".assigndj-overview-section .icon"
		);
		const nameNode = document.querySelector(
			".assigndj-overview-section .name"
		);
		elem.addEventListener("mouseover", (e) => {
			iconNode.textContent = name.slice(0, 2).toUpperCase();
			nameNode.textContent = name;
		});
	}
	updateClickListener(timeslot) {
		this.elem.addEventListener("click", this.assignDJ);
		this.elem.timeslot = timeslot;
		this.elem.DJ = this;
	}

	// Creates new timeslot instance in DB and assigns DJ to it. If timeslot instance already there, just update instead
	async assignDJ(e) {
		// Timeslot object
		const timeslot = e.target.timeslot; // taken from event.[param] from eventlistener
		const newDJ = e.target.DJ; // taken from event.[param] from eventlistener
		e.stopPropagation();
		// try to check for existing timeslot with DJ
		const currentDJ = await fetch(`/api/getTimeslot/${timeslot.id}`).then(
			(response) => {
				return response.json();
			}
		);
		// If no dj in timeslot, create timeslot and assign w dj
		if (currentDJ === null) {
			await fetch("/api/createTimeslot", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: timeslot.day + timeslot.time,
					day: timeslot.day,
					time: timeslot.time,
					dj: {
						id: newDJ.id,
						name: newDJ.name,
					},
					taken: true,
					songs: [],
				}),
			});
		}
		// timeslot exists, just update the timeslot document with new dj
		else {
			await fetch("/api/updateTimeslot", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: timeslot.day + timeslot.time,
					dj: {
						id: newDJ.id,
						name: newDJ.name,
					},
				}),
			});
		}
		timeslot.setDJ(newDJ);
		window.TimeslotModal.setTimeslotDJ(timeslot.DJ);
		window.DJModal.closeAssignDJModal(e);
		window.TimeslotModal.openTimeSlotModal(timeslot);
	}
}

class DJModal {
	constructor() {
		this.fetchDJList();
		this.Timeslot = null;
	}
	// Fetches list of DJs at start and create DJ objects with linked elmement according to data-name
	fetchDJList = async () => {
		const resp = await fetch("/api/getDJList");
		const data = await resp.json();
		this.DJs = [];
		data.forEach((dj) => {
			this.DJs.push(
				new DJ(
					dj.id,
					dj.name,
					document.querySelector(`[data-id='${dj.id}']`)
				)
			);
		});
	};
	openAssignDJModal(timeslot) {
		// Set the DJmodal for the timeslot
		this.DJs.forEach((DJ) => {
			DJ.updateClickListener(timeslot);
		});
		document.querySelector(".assign-dj-modal").style.display = "flex";
	}
	closeAssignDJModal(e) {
		const DJcontainers = document.querySelectorAll(".dj");
		this.link;
		if (e.target === document.querySelector(".assign-dj-modal")) {
			document.querySelector(".assign-dj-modal").style.display = "none";
		} else {
			DJcontainers.forEach((DJcontainer) => {
				if (e.target === DJcontainer) {
					document.querySelector(".assign-dj-modal").style.display =
						"none";
					return;
				}
			});
		}
	}
}

document.addEventListener("DOMContentLoaded", () => {
	window.DJModal = new DJModal();
});

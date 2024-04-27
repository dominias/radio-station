class Day {
	// date Date object, array of times
	constructor(date, times, dayNumber) {
		this.date = date;
		this.dayName = date
			.toLocaleDateString("en-US", { weekday: "short" })
			.toUpperCase();
		this.dayMonthString = date.getDate() + "/" + (date.getMonth() + 1);
		this.times = times;
		this.dayNumber = dayNumber; // new
		this.timeslots = []; // holds Timeslot objects
	}

	// render each day
	render() {
		const elem = document.createElement("div");
		elem.className = "day";

		// Create day label
		const dayLabel = document.createElement("div");
		dayLabel.className = "day-label";

		const currentDay = new Date();
		if (this.dayNumber === 4) {
			dayLabel.id = "current";
		}

		dayLabel.textContent = this.dayName;
		// Create day label span
		const dayLabelSpan = document.createElement("span");
		dayLabelSpan.textContent = this.dayMonthString;
		dayLabel.appendChild(dayLabelSpan);
		elem.appendChild(dayLabel);

		// Create timeslots container
		const timeslotContainer = document.createElement("div");
		timeslotContainer.className = "timeslot-container";
		elem.appendChild(timeslotContainer);
		// Append timeslots to day
		this.times.forEach(async (time, i) => {
			const ts = new Timeslot(
				"" +
					this.date.getFullYear() +
					this.date.getMonth() +
					this.date.getDate(),
				time
			);
			timeslotContainer.appendChild(ts.render(this.dayNumber));
			// Retrieve timeslot data from DB given day id
			await fetch(`/api/getTimeslot/${this.dayNumber}/${ts.id}`)
				.then((response) => {
					return response.json();
				})
				.then(async (timeslot) => {
					if (timeslot !== null) {
						ts.id = timeslot.id;
						ts.day = timeslot.day;
						ts.time = timeslot.time;
						ts.setDJ(timeslot.dj);
						ts.songs = timeslot.songs;
					}
					// no timeslot yet, make it using day number
					else {
						const defaultTimeslot = {
							id: ts.id,
							dj: ts.DJ,
							listId: ts.listId,
							day: ts.day,
							time: ts.time,
							taken: ts.taken,
						};
						await fetch(`/api/createTimeslot/${this.dayNumber}`, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(defaultTimeslot),
						})
							.then((response) => response.json())
							.then((res) => console.log(res));
					}
				});
			this.timeslots.push(ts);
		});

		return elem;
	}
}

// Represents the timeslot divs on the screen
class Timeslot {
	constructor(day, time) {
		this.id = day + time;
		this.DJ = -1;
		this.listId = -1;
		this.day = day;
		this.time = time;
		this.taken = false;
		this.songs = [];
		this.element = null;
	}

	// set DJ object for timeslot from the assignDJ class to indicate that the timeslot is now taken by the DJ
	setDJ(DJ) {
		this.DJ = DJ;
		this.taken = true;
		this.element.classList.add("taken");
	}

	render(dayNumber) {
		const elem = document.createElement("div");
		elem.className = "timeslot";
		elem.textContent = this.time;

		// When click on timeslot button, opens modal and passes in object to modal
		elem.addEventListener("click", () => {
			if (this.taken) {
				window.TimeslotModal.openTimeSlotModal(this);
			} else {
				window.DJModal.openAssignDJModal(this);
			}
		});

		this.element = elem;
		return elem;
	}
}

// Renders all of the displayed days from current date
async function renderDaysShown(currentDate, times, dayNumbers) {
	let dayElements = [];
	let containerElement = document.querySelector(".day-container");

	for (let i = 0; i <= currentDate.getDay(); i++) {
		let date = new Date(currentDate);
		date.setDate(currentDate.getDate() - (currentDate.getDay() - i));
		dayElements.push(new Day(date, times, dayNumbers[i]));
		containerElement.appendChild(dayElements[i].render());
	}

	for (let i = currentDate.getDay() + 1; i <= 6; i++) {
		let date = new Date(currentDate);
		date.setDate(currentDate.getDate() + (i - currentDate.getDay()));
		dayElements.push(new Day(date, times, dayNumbers[i]));
		containerElement.appendChild(dayElements[i].render());
	}

	return dayElements;
}
// Add times
document.addEventListener("DOMContentLoaded", async () => {
	const dayNumbers = [0, 1, 2, 3, 4, 5, 6];
	const times = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];

	let currDate = new Date(2024, 3, 26);

	// Render database schema
	await fetch("/api/createTimes/").then(response => response.json()).then(res => console.log(res));

	// Holds all day divs
	let daysElementsShown = await renderDaysShown(currDate, times, dayNumbers);

	let listDates = [];
	daysElementsShown.forEach((date, i) => {
		let listTimeslots = [];
		date.timeslots.forEach;

		listDates.push({
			number: dayNumbers[i],
			timeslots: listTimeslots,
		});
	});

	document.querySelector(".logout-button").addEventListener("click", (e) => {
		document.querySelectorAll(".taken").forEach((elem) => {
			elem.classList.remove("taken");
		});
		daysElementsShown.forEach((day) => {
			day.timeslots.forEach((timeslot) => {
				timeslot.id = "";
				timeslot.day = "";
				timeslot.time = "";
				timeslot.DJ = null;
				timeslot.taken = false;
				timeslot.songs = [];
			});
		});
		const filler = document.createElement("div");
		filler.style.width = "319.84px";
		document.querySelector(".profile").innerHTML = "";
		document.querySelector(".profile").appendChild(filler);
		e.stopPropagation();
	});
});

class Day {
	// date Date object, array of times
	constructor(date, times) {
		this.date = date;
		this.dayName = date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
		this.dayMonthString = date.getDate() + "/" + (date.getMonth() + 1);
		this.times = times;
		this.timeslots = []; // holds Timeslot objects
	}

	render() {
		const elem = document.createElement("div");
		elem.className = "day";

		// Create day label
		const dayLabel = document.createElement("div");
		dayLabel.className = "day-label";

		const currentDay = new Date();
		if (
			this.date.getFullYear() === currentDay.getFullYear() &&
			this.date.getMonth() === currentDay.getMonth() &&
			this.date.getDate() === currentDay.getDate()
		) {
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

		this.times.forEach((time, i) => {
			this.timeslots.push(new Timeslot(this.date, time));
			timeslotContainer.appendChild(this.timeslots[i].render());
		});

		return elem;
	}
}

// Represents the timeslot divs on the screen
class Timeslot {
	constructor(day, time) {
		this.id = day + time;
		this.day = day;
		this.time = time;
		this.DJ = null;
		this.songs = [];
		this.element = null;
		this.taken = false;
	}

	// set DJ object for timeslot from the assignDJ class to indicate that the timeslot is now taken by the DJ
	setDJ(DJ) {
		this.DJ = DJ;
		this.taken = true;
		this.element.classList.add("taken");
	}

	render() {
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
function renderDaysShown(currentDate, times) {
	let dayElements = [];
	let containerElement = document.querySelector(".day-container");
	for (let i = 0; i <= currentDate.getDay(); i++) {
		let date = new Date(currentDate);
		date.setDate(currentDate.getDate() - (currentDate.getDay() - i));
		dayElements.push(new Day(date, times));
		containerElement.appendChild(dayElements[i].render());
	}

	for (let i = currentDate.getDay() + 1; i <= 6; i++) {
		let date = new Date(currentDate);
		date.setDate(currentDate.getDate() + (i - currentDate.getDay()));
		dayElements.push(new Day(date, times));
		containerElement.appendChild(dayElements[i].render());
	}

	return dayElements;
}

// Updates the shown weeks given the weekPointer
function updateDaysShown(weekPointer, times) {
	let dayContainer = document.querySelector(".day-container");
	dayContainer.innerHTML = "";
	let newDate = new Date();
	newDate.setDate(newDate.getDate() + 7 * weekPointer);
	return renderDaysShown(newDate, times);
}

// Add times
document.addEventListener("DOMContentLoaded", () => {
	const times = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];

	let currDate = new Date();

	// Holds all day divs
	let daysElementsShown = renderDaysShown(currDate, times);
	// Pointer to indicate which week shown (0 is current week, ++ is next weeks, -- is prev weeks)
	let weekPointer = 0;

	document.querySelectorAll(".back, .forward").forEach((button) => {
		button.addEventListener("click", () => {
			if (button.className === "back") {
				daysElementsShown = updateDaysShown(--weekPointer, times);
			} else {
				daysElementsShown = updateDaysShown(++weekPointer, times);
			}
		});
	});
});

class Day {
	// date Date object, array of Timeslots
	constructor(date, timeslots) {
		this.date = date;
		this.dayName = date
			.toLocaleDateString("en-US", { weekday: "short" })
			.toUpperCase();
		this.dayMonthString = date.getDate() + "/" + date.getMonth() + 1;
		this.timeslots = timeslots;
	}

	render() {
		const elem = document.createElement("div");
		elem.className = "day";

		// Create day label
		const dayLabel = document.createElement("div");
		dayLabel.className = "day-label";

		if (this.date.getDate() === new Date().getDate()) {
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
		this.timeslots.forEach((timeslot) => {
			timeslotContainer.appendChild(timeslot.render());
		});

		return elem;
	}
}

class Timeslot {
	// time is of type string
	constructor(time) {
		this.time = time;
	}

	render() {
		const elem = document.createElement("div");
		elem.className = "timeslot";
		elem.textContent = this.time;
		return elem;
	}
}

// Renders all of the displayed days from current date
function renderDaysShown(currentDate, timeslots) {
	let dayElements = [];
	let containerElement = document.querySelector(".day-container");
	for (let i = 0; i <= currentDate.getDay(); i++) {
		let date = new Date();
		date.setDate(currentDate.getDate() - (currentDate.getDay() - i));
		dayElements.push(new Day(date, timeslots));
		containerElement.appendChild(dayElements[i].render());
	}

	for (let i = currentDate.getDay() + 1; i <= 6; i++) {
		let date = new Date();
		date.setDate(currentDate.getDate() + (i - currentDate.getDay()));
		dayElements.push(new Day(date, timeslots));
		containerElement.appendChild(dayElements[i].render());
	}

	return dayElements;
}

document.addEventListener("DOMContentLoaded", () => {
	const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
	const times = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];
	let timeslots = [];
	for (let i = 0; i < 6; i++) {
		timeslots.push(new Timeslot(times[i]));
	}

	let currDate = new Date();

	// Holds all day divs
	let daysElementsShown = renderDaysShown(currDate, timeslots);
	console.log(daysElementsShown);
});

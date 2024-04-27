function validate() {
	const subjectInput = document.querySelector('input[name="subject"]');
	const nameInput = document.querySelector('input[name="name"]');
	const emailInput = document.querySelector('input[name="email"]');
	const questionInput = document.querySelector('input[name="question"]');
	if (!subjectInput.value) {
		alert("Subject cannot be empty!");
		return;
	}
	if (!nameInput.value) {
		alert("Name cannot be empty!");
		return;
	}
	if (!emailInput.value) {
		alert("Email cannot be empty!");
		return;
	}
	if (!questionInput.value) {
		alert("Question cannot be empty!");
		return;
	}
}

document.addEventListener("DOMContentLoaded", () => {
	document.querySelector(".container").addEventListener("submit", (e) => {
		e.preventDefault();
		validate();
	});

	document.querySelector(".logout-button").addEventListener("click", (e) => {
		const filler = document.createElement("div");
		filler.style.width = "319.84px";
		document.querySelector(".profile").innerHTML = "";
		document.querySelector(".profile").appendChild(filler);
	});
});

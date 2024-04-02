let timeslotDB = [];

function getData() {
	return timeslotDB;
}
function addTimeslot(timeslot) {
	timeslotDB.push(timeslot);
}

function editTimeslot(timeslot) {
	timeslotDB.find();
}

module.exports = {
	getData,
	addTimeslot,
	editTimeslot,
};

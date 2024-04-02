const timeslotDB = require("./data/timeslotDB");

const getTimeslot = (app) => {
	app.get("/api/getTimeslot/:id", (req, resp) => {
		const timeslots = timeslotDB.getData();
		const idToFind = req.params.id;
		const timeslot = timeslots.filter((timeslot) => timeslot.id === idToFind);
		if (timeslot.length > 0) {
			resp.json(timeslot);
		} else {
			resp.json(null);
		}
	});
};

// Updates timeslot to req.body
const updateTimeslot = (app) => {
	app.put("/api/updateTimeslot", (req, resp) => {
		const timeslots = timeslotDB.getData();
		const idToFind = req.body.id;
		const foundTimeslot = timeslots.find((timeslot) => timeslot.id === idToFind);
		foundTimeslot.DJ = req.body.DJ;
		resp.json("Successful");
	});
};

const handleCreateTimeslot = (app) => {
	app.post("/api/createTimeslot", (req, resp) => {
		timeslotDB.addTimeslot(req.body);
		resp.json("Successful");
	});
};

module.exports = {
	getTimeslot,
	handleCreateTimeslot,
	updateTimeslot,
};

const mongoose = require("mongoose");
const timeslotsModel = require("./schemas/timeslotSchema"); // dj collection database

// get one timeslot based on id
const getTimeslot = (app) => {
	app.get("/api/getTimeslot/:id", (req, resp) => {
		console.log(req.params.id);
		timeslotsModel.findOne({ id: req.params.id }).then((data) => {
			if (data == null) {
				resp.json(null);
			} else {
				console.log(data);
				resp.json(data);
			}
		});
	});
};

// Updates timeslot to req.body
const updateTimeslot = async (app) => {
	app.put("/api/updateTimeslot", async (req, resp) => {
		// const timeslots = timeslotDB.getData();
		// const idToFind = req.body.id;
		// const foundTimeslot = timeslots.find((timeslot) => timeslot.id === idToFind);
		// foundTimeslot.DJ = req.body.DJ;

		const doc = await timeslotsModel.findOneAndUpdate({ id: req.body.id }, { DJid: req.body.DJid, DJ: req.body.DJ }, { new: true });
		console.log(doc);
		resp.json("Successful");
	});
};

const handleCreateTimeslot = async (app) => {
	app.post("/api/createTimeslot", async (req, resp) => {
		await new timeslotsModel(req.body).save();
		resp.json("Successful");
	});
};

module.exports = {
	getTimeslot,
	handleCreateTimeslot,
	updateTimeslot,
};

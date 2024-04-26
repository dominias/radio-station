const mongoose = require("mongoose");
const timeslotsModel = require("./schemas/timeslotSchema"); // dj collection database

// get one timeslot based on id
const getTimeslot = (app) => {
	app.get("/api/getTimeslot/:id", (req, resp) => {
		timeslotsModel.findOne({ id: req.params.id }).then((data) => {
			if (data == null) {
				resp.json(null);
			} else {
				resp.json(data);
			}
		});
	});
};

// Updates timeslot to req.body
const updateTimeslot = async (app) => {
	app.put("/api/updateTimeslot", async (req, resp) => {
		await timeslotsModel.findOneAndUpdate(
			{ id: req.body.id },
			{ dj: req.body.dj },
			{ new: true }
		);
		resp.json("Successful");
	});
};

const handleCreateTimeslot = async (app) => {
	app.post("/api/createTimeslot", async (req, resp) => {
		await timeslotsModel(req.body).save();
		resp.json("Successful");
	});
};

module.exports = {
	getTimeslot,
	handleCreateTimeslot,
	updateTimeslot,
};

const mongoose = require("mongoose");
const timesModel = require("./schemas/timeSchema"); // dj collection database

// get one timeslot based on day id
const getTimeslot = (app) => {
	app.get("/api/getTimeslot/:id", (req, resp) => {
		timesModel.findOne({ dates: { $elemMatch: { id: req.params.id } } }).then((data) => {
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
		await timesModel.findOneAndUpdate({ id: req.body.id }, { dj: req.body.dj }, { new: true });
		resp.json("Successful");
	});
};

const handleCreateTimeslot = async (app) => {
	app.post("/api/createTimeslot", async (req, resp) => {
		await timesModel(req.body).save();
		resp.json("Successful");
	});
};

// const createTimes = async (app) => {
// 	app.post("/api/createTimes", async (req, resp) => {

// 	})
// }

module.exports = {
	getTimeslot,
	handleCreateTimeslot,
	updateTimeslot,
};

const mongoose = require("mongoose");
const timesModel = require("./schemas/timeSchema"); // dj collection database

// get one timeslot based on day id
const getTimeslot = (app) => {
	app.get("/api/getTimeslot/:dayId/:timeslotId", (req, resp) => {
		let found = false;
		timesModel.findOne({ id: 0 }).then((doc) => {
			doc.dates[req.params.dayId].timeslots.forEach((timeslot) => {
				if (timeslot.id === req.params.timeslotId) {
					resp.json(timeslot);
					found = true;
				}
			});
			if (!found) {
				resp.json(null);
			}
		});
	});
};

// Updates timeslot to req.body
const updateTimeslot = async (app) => {
	app.put("/api/updateTimeslot", async (req, resp) => {
		await timesModel.findOneAndUpdate(
			{ id: req.body.id },
			{ dj: req.body.dj },
			{ new: true }
		);
		resp.json("Successful");
	});
};

const handleCreateTimeslot = async (app) => {
	app.post("/api/createTimeslot/:dayLabel", async (req, resp) => {
		const doc = await timesModel.findOneAndUpdate(
			{ id: 0 },
			{ $push: { [`dates.${req.params.dayLabel}.timeslots`]: req.body } },
			{ new: true }
		);
		resp.json("Successful");
	});
};

// create times instance if not there yet
const createTimes = async (app) => {
	app.get("/api/createTimes/", async (req, resp) => {
		await timesModel.findOne({ id: 0 }).then((data) => {
			if (data === null) {
				const dateList = [];
				for (let i = 0; i < 7; i++) {
					dateList.push({
						number: i,
						timeslots: [],
					});
				}
				new timesModel({ id: 0, week: "", dates: dateList }).save();
			}
			resp.json("Successful");
		});
	});
};

module.exports = {
	getTimeslot,
	handleCreateTimeslot,
	updateTimeslot,
	createTimes,
};

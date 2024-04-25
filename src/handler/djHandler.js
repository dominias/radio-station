const djsCollection = require("./schemas/djSchema"); // dj collection database

// Retrieves all DJ names from database
const getDJs = async () => {
	let djs = [];
	await djsCollection
		.find()
		.then((data) => {
			data.forEach((dj) => {
				djs.push(dj);
			});
			djs = djs.sort((a, b) => {
				if (a.name.toLowerCase() < b.name.toLowerCase()) {
					return -1;
				} else if (a.name.toLowerCase() > b.name.toLowerCase()) {
					return 1;
				}
				return 0;
			});
		})
		.catch((err) => {
			console.log(err);
		});
	return djs;
};

const handleGetDJList = async (app) => {
	app.get("/api/getDJList", async (_, resp) => {
		resp.json(await getDJs());
	});
};

module.exports = {
	getDJs,
	handleGetDJList,
};

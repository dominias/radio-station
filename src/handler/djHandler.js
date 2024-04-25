const djsCollection = require("./schemas/djSchema"); // dj collection database

// Retrieves all DJ names from database
const getDJs = async () => {
	let djNames = [];
	await djsCollection
		.find()
		.then((data) => {
			data.forEach((dj) => {
				djNames.push(dj.name);
			});
			djNames = djNames.sort();
		})
		.catch((err) => {
			console.log(err);
		});
	return djNames;
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

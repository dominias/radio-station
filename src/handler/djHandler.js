// return all DJs
// const djs = require("./schemas/djSchema");
const getDJs = () => {
	// get data from mongodb djs collection
	djs.find()
		.then((data) => {
			console.log(data);
		})
		.catch((err) => {
			console.log("unable to connect to djs");
		});
	// return djs.sort();
};

const handleGetDJList = (app) => {
	app.get("/api/getDJList", (req, resp) => {
		resp.json(getDJs());
	});
};

module.exports = {
	getDJs,
	handleGetDJList,
};

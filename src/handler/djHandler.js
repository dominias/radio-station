// return all DJs
const djs = require("./data/djs.json");
const getDJs = () => {
	// get data from company provider
	return djs.sort();
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

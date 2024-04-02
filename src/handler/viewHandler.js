const handlePage = (app, djHandler, songHandler) => {
	app.get("/", (_, resp) => {
		// replace with fetch to get djs from mongodb later
		resp.render("index", {
			djs: djHandler.getDJs(),
			songs: songHandler.getSongs(),
		});
	});

	app.get("/contact", (req, resp) => {
		resp.render("support");
	});

	app.get("/songModal", (req, resp) => {
		resp.render("songModal", { songs: songHandler.getSongs() });
	});
};
module.exports = {
	handlePage,
};

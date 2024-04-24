const handlePage = async (app, djHandler, songHandler) => {
	app.get("/", async (_, resp) => {
		// replace with fetch to get djs from mongodb later
		const djNames = await djHandler.getDJs();
		resp.render("index", {
			djs: djNames,
			songs: songHandler.initSongs(),
		});
	});

	app.get("/contact", (req, resp) => {
		resp.render("support");
	});

	app.get("/songModal", (req, resp) => {
		resp.render("songModal", { songs: songHandler.initSongs() });
	});
};
module.exports = {
	handlePage,
};

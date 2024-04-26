const handlePage = async (app, djHandler, songHandler) => {
	app.get("/", async (_, resp) => {
		// replace with fetch to get djs from mongodb later
		const djNames = await djHandler.getDJs();
		const songs = await songHandler.initSongs();
		resp.render("index", {
			djs: djNames,
			songs: songs,
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

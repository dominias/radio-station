const handlePage = async (app, djHandler, songHandler) => {
	app.get("/", async (_, resp) => {
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
};
module.exports = {
	handlePage,
};

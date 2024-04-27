const path = require("path");
const express = require("express");
const app = express();
const hostname = "localhost";
require("dotenv").config();
const port = process.env.port;
// create connection to database
require("./handler/dbConnector.js").connect();

const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

// open livereload high port and start to watch public directory for changes
const liveReloadServer = livereload.createServer();
console.log(__dirname);
liveReloadServer.watch([
	path.join(__dirname, "public"),
	path.join(__dirname, "views"),
]);

// ping browser on Express boot, once browser has reconnected and handshaken
liveReloadServer.server.once("connection", () => {
	setTimeout(() => {
		liveReloadServer.refresh("/");
	}, 50);
});
// reference our own modules
const viewHandler = require("./handler/viewHandler.js");
const djHandler = require("./handler/djHandler.js");
const timeslotHandler = require("./handler/timeslotHandler.js");
const songHandler = require("./handler/songHandler.js");
// register view engine
app.set("view engine", "ejs");

// Serve static files from the public directory
app.use(connectLivereload());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

viewHandler.handlePage(app, djHandler, songHandler);
djHandler.handleGetDJList(app);
timeslotHandler.getTimeslot(app);
timeslotHandler.updateTimeslot(app);
timeslotHandler.handleCreateTimeslot(app);
timeslotHandler.createTimes(app);
songHandler.getSongsFromPlaylist(app);
songHandler.querySongList(app);
songHandler.addSongToPlaylist(app);
songHandler.removeSongFromPlaylist(app);

// for anything else, display 404 errors
app.use((req, resp) => {
	resp.status(404).send("Unable to find the requested resource!");
});
// use port in .env file or 8080
app.listen(port, () => {
	console.log(`Server running at: http://${hostname}:${port}/`);
});

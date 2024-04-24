require('dotenv').config();
const express = require('express');
const app = express();
// create connection to database
require('./handler/dbConnector.js').connect();
const port = process.env.port;
app.listen(port, () => {
console.log("Server running at port= " + port);
});
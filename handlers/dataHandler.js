require('dotenv').config();
const mongoose = require('mongoose');

const connect = () => {
 const opt = { dbName: 'station' };

 console.log("Starting to connect to mongo...");
 mongoose.connect(process.env.MONGO_URL, opt);

 const database = mongoose.connection;
 
 database.on('error',console.error.bind(console,'connection error:'));
 database.once('open', function callback () {

 console.log("Successful connection to mongo.");
 });
}; 

module.exports = {
    connect
};
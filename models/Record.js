const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    id: Number,
    name: String,
    artist: String,
    time: String
}); 

 module.exports = mongoose.model('Record', recordSchema, 'records'); 
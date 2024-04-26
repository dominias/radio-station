const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    id: Number,
    user: Number,
    name: String,
    records: [{recid: Number}]
}); 

 module.exports = mongoose.model('List', listSchema, 'lists'); 
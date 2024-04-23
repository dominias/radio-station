const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: Number,
    name: String
}); 

 module.exports = mongoose.model('User', userSchema, 'users'); 
const mongoose = require('mongoose')

const djSchema = new mongoose.Schema({
  id: Number,
  name: String
})

module.exports = mongoose.model('dj', djSchema)
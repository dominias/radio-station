const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema({
    id: Number,
    week: String,
    dates: [
        {
            number: Number,
            timeslots: [
                {
                    id: String,
                    day: String,
                    user: Number,
                    list: Number,
                    name: String,
                    time: String,
                    taken: Boolean
                }
            ]
        }
    ]
}); 

 module.exports = mongoose.model('Time', timeSchema, 'times'); 
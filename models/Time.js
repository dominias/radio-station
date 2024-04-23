const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema({
    id: Number,
    week: String,
    dates: [
        {
            number: Number,
            timeslots: [
                {
                    id: Number,
                    user: Number,
                    list: Number,
                    name: String,
                    time: String,
                    open: String
                }
            ]
        }
    ]
}); 

 module.exports = mongoose.model('Time', timeSchema, 'times'); 
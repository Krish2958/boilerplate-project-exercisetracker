const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const excerciseSchema = new Schema({
    userId:{
        type:  Schema.Types.ObjectId,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    duration:{
        type: Number,
        required: true
    },
    date:{
        type: Date
    }
})

module.exports = mongoose.model('Excercise', excerciseSchema);
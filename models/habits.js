const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({

    name :{
        type: String,
        required: true
    },

    status: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Status'
        }
    ]
},{
    timestamps: true
});

const Habit = mongoose.model('Habit',habitSchema);

module.exports = Habit;
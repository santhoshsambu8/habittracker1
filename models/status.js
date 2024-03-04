const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({

    date:{
        type: Date,
        required: true
    },
    datestring:{
        type: String,
        required: true
    },

    habitstatus:{
        type: String,
        required: true

    },

    habitid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habit'
    }
    
},{
    timestamps: true

});


const Status = mongoose.model('Status',statusSchema);
module.exports =Status;


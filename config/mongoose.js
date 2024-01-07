
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/habit_tracker_dev');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to mongodb"));

db.once('open',function(){
    console.log('Connected to database :: MongoDB');
});

module.exports = db;


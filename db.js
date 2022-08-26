const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'

const connectMongoDb = () => {
    mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false', () => {
        console.log('Mongo DB connected successfully');
    });    
}

module.exports = connectMongoDb;
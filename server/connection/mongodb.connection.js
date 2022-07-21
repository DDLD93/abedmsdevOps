const mongoose = require('mongoose');
var host = process.env.MONGODB_HOST || "database"
var port = process.env.MONGODB_PORT || 27017
var connString = "mongodb+srv://abedmis:16001105@cluster0.fljiocn.mongodb.net/?retryWrites=true&w=majority"
const url = `mongodb://${host}:${port}/system`
module.exports = () => {
    let options = { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
    }

    const db = mongoose.connection;
    db.on('connected', () => {
        console.log('We are connected to mongodb');
    });
    db.on('error', (err) => {
        console.log('Error connecting to mongodb ', err);
    });

    db.on('disconnect', () => {
        console.log('Oops we are disconnected from mongodb');
        mongoose.connect(connString, options);
    });
    mongoose.connect(connString, options);
}
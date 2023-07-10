const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/startup-matchmaker");

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected')
});

module.exports = mongoose.connection;

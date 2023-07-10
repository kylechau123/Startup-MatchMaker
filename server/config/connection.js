const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/matchmaker');

module.exports = mongoose.connection;

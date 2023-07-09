const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/your-db-name", {});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected')
});

module.exports = mongoose.connection;

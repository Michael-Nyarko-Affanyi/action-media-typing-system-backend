const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
    const databaseURL = process.env.MONGO_URI.replace('<password>', process.env.MONGO_PASSWORD);
    try {
        const conn = await mongoose.connect(databaseURL);
        logger.info(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        logger.error(err);
        process.exit(1);
    }
};

module.exports = connectDB;
const winston = require('winston');

const logger = winston.createLogger({
    level: process.env.LOGGER_LEVEL,
    format: winston.format.json({
        space: 2,
        replacer: (key, value) => {
            if (key === 'stack') {
                return undefined;
            }
            return value;
        }
    }),
    transports: [
        new winston.transports.File({ filename: 'logs/logs.log' }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

module.exports = logger;
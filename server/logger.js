const winston = require('winston');

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error"
        }),
        new winston.transports.File({
            filename: "logs/info.log",
            level: "info"
        })
    ]
});

module.exports = logger;
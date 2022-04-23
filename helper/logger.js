const { createLogger, transports, format } = require('winston');

const customLogger = createLogger({
    transports: [
        new transports.File({ filename: 'info.log', format: format.combine(format.timestamp(), format.json()) }),
        // new transports.File({ filename: 'error.log', format: format.combine(format.timestamp(), format.json()) }),
    ],
})

module.exports = { customLogger };
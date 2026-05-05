const winston = require('winston');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');


// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}


// sanitize sensitive data
const sanitize = winston.format((info) => {
     if (info.user && info.user.password) {
    info.user.password = '*******';
  }

  if (info.user && info.user.creditCard) {
    info.user.creditCard = '*******';
  }

  if (info.headers && info.headers.authorization) {
    info.headers.authorization = '*******';
  }

  return info;
})


// base logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        sanitize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json()
    ),

    transports: [
        
        // Console output
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),// colorize the log level for better readability in the console
                winston.format.printf(({ timestamp, level, message, ...rest }) => 
                    `${timestamp}
                     [${level}]: ${message}
                     ${Object.keys(rest).length ? JSON.stringify(rest) : ''}`

                )
            )
        }),

        // Combined log file (all logs)
        new winston.transports.File({
            filename: path.join(logsDir, 'combined.log'),
            maxsize: 5242880, // 5MB
            maxFiles: 100
            }),

        // Error log file (only errors and warnings)
        new winston.transports.File({
            filename: path.join(logsDir, 'error.log'),
            level: 'warn',
            maxsize: 5242880, // 5MB
            maxFiles: 100
        }),
        
        // information log file (only information and above)
        new winston.transports.File({
            filename: path.join(logsDir, 'information.log'),
            level: 'info',
            maxsize: 5242880, // 5MB
            maxFiles: 100
        })
    ]
});

// child logger
function createRequestLogger(req) {
    
    // this is the child logger that will be used to log the details of the request, it will have the same level and format as the base logger, but it will have additional information about the request such as the request id, method, url, ip, and user id (if available)
    return logger.child({
        requestId: req.id,
        method: req.method,
        url: req.url,
        ip: req.ip,
        userId: req.user ? req.user.id : 'anonymous'
    
    });
}

const logs = (req, res, next) => { // this is the middleware function that will be used in the app.js file to log all the requests coming to the server
    
// generate a unique request id for each request, this will help us to track the request in the logs and also to correlate the logs with the request
    req.id = uuidv4();


    req.logger = createRequestLogger(req);
    req.logger.info({message: 'Request recieved'});

    const start = Date.now();

// log the response when it is finished, this will help us to track the response time and also to log the status code of the response
    res.on('finish', ()=> {

        const duration = Date.now() - start;

        req.logger.info({
            message: `Request complete`,
            statusCode: res.statusCode,
            duration
        })
    })

    next();
}

// function generateRequestId() {
//     return Date.now().toString(36) + Math.random().toString(36).substring(2);
// };

module.exports = logs;
module.exports.logger = logger; 
// global error handler
const { logger } = require('./logging.middleware');

const errorMiddleware = (err, req, res, next)=>{
    
    
    try{

        let error = { ...err};

        error.message = err.message;

        // Log the error
        const errorLogger = req.logger || logger;
        errorLogger.error({ 
            message: 'An error occurred',
            errorName: err.name,
            errorMessage: err.message,
            errorCode: err.code,
            statusCode: error.statusCode || 500,
            stack: err.stack
        });
        
        //Mongoose bad objectId
        if(err.name === 'CastError' || err.name === 'castError'){
            const message = 'resource not found';
            error = new Error(message);
            error.statusCode = 404;
            throw error;
            
        }

        // Mongoose duplicate key (error.code is the usual property)
        if(err.code === 11000 || err.name === 'MongoServerError'){
            const message = 'Duplicate field value';
            error = new Error(message);
            error.statusCode = 400;
            throw error;
        }


        // Mongoose validation error
        if(err.name == 'ValidationError'){
            // we will loop through the error object and extract the message from each error and join them together
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
            throw error;
        }

        // response from the middleware
        res.status(error.statusCode || 500).json({success: false, error: error.message || 'Server error'})

    }catch(error){

        next(error);
    }
};

module.exports = errorMiddleware;
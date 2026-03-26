// global error handler

const errorMiddleware = (err, req, res, next)=>{
    
    
    try{

        // create a new error object by copying the properties of the original error
        let error = { ...err};

        // copy the message property from the original error to the new error object
        error.message = err.message;

        // console.log(err.stack)
        console.error(err);
        
        //Mongoose bad objectId
        if(err.name === 'CastError' || err.name === 'castError'){
            const message = 'resource not found';
            error = new Error(message);
            error.statusCode = 404;
        }

        // Mongoose duplicate key (error.code is the usual property)
        if(err.code === 11000 || err.name === 'MongoServerError'){
            const message = 'Duplicate field value';
            error = new Error(message);
            error.statusCode = 400;
        }

        // Mongoose validation error
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }

        // response from the middleware
        res.status(error.statusCode || 500).json({                                        
            success: false, 
            error: error.message || 'Server error'
        })

    }catch(error){

        // if an error occurs while handling the error, log it and send a generic server error response
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error' });
        next(error);
    }
};

module.exports = errorMiddleware;
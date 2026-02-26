// global error handler

const errorMiddleware = (err, req, res, next)=>{
    
    
    try{

        let error = { ...err};

        error.message = err.message;

        console.error(err.stack);
        
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
        if(err.name == 'ValidationError'){
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }

        // response from the middleware
        // note spelling corrected and default values preserved
        res.status(error.statusCode || 500).json({success: false, error: error.message || 'Server error'})

    }catch(error){

        next(error);
    }
};

module.exports = errorMiddleware;
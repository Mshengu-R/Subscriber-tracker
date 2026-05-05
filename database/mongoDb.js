// the 
const mongoose = require('mongoose');
const {DB_URI, NODE_ENV } = require('../config/env');
const { logger } = require('../middleware/logging.middleware');


if(!DB_URI){
    logger.error({ message: 'MONGODB_URI environment variable not defined' });
    throw new Error('Please define the MONGODB_URI environment variable inside .env.<development/production>.local');

}

// database connection helper
const connectToDatabase = async ()=>{
    
    try{
        logger.info({ message: 'Attempting to connect to database', environment: NODE_ENV });
        await mongoose.connect(DB_URI);
        
        logger.info({ message: 'Connected to database successfully', environment: NODE_ENV });
    
    }catch(error){
    
        logger.error({ message: 'Error connecting to the database', error: error.message });
        process.exit(1);
    }
}

// export named function so callers can destructure
module.exports = { connectToDatabase };
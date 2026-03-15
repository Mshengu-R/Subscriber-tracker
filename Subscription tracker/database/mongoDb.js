const mongoose = require('mongoose');
const {DB_URI, NODE_ENV } = require('../config/env');

// when database string not available
if(!DB_URI){

    const message = 'Please define the MONGODB_URI environment variable inside .env.<development/production>.local';
    throw new Error(message);

}

// database connection helper
const connectToDatabase = async ()=>{
    
    try{

        await mongoose.connect(DB_URI);
        console.log(`Connected to database in ${NODE_ENV} mode`);
    
    }catch(error){

        // if an error occurs while trying to connect to the database throw the error and exist
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
}

// export named function so callers can destructure
module.exports = { connectToDatabase };

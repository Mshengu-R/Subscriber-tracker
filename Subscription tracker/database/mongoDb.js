// the 
const mongoose = require('mongoose');
const {DB_URI, NODE_ENV } = require('../config/env');


if(!DB_URI){
    throw new Error('Please define the MONGODB_URI environment variable inside .env.<development/production>.local');

}

// database connection helper
const connectToDatabase = async ()=>{
    try{
        await mongoose.connect(DB_URI);
        console.log(`Connected to database in ${NODE_ENV} mode`);
    }catch(error){
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
}

// export named function so callers can destructure
module.exports = { connectToDatabase };
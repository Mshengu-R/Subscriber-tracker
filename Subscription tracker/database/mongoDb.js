// the 
const mongoose = require('mongoose');
const {DB_URI, NODE_ENV } = require('../config/env');


if(!DB_URI){
    throw new Error('Please define the MONGODB_URI environment variable inside .env.<development/production>.local');

}

const connectTodDatabase = async ()=>{
    try{

        await mongoose.connect(DB_URI);
        console.log(`Connected to database in ${NODE_ENV} mode`);
        
    }catch(error){

        console.error('Error connecting to the databse:', error);
        process.exit();
    }
}

module.export = connectTodDatabase;
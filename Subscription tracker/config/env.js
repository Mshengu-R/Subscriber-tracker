const dotenv = require('dotenv');
// require('dotenv').config

// load environment variables based on NODE_ENV
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

const {
    PORT, 
    NODE_ENV, 
    DB_URI,
    JWT_SECRET,
    JWT_EXPIRES,
    ARCJET_ENV,
    ARCJET_KEY } = process.env;


module.exports = {
    PORT,        // port number for the server to listen on 
    NODE_ENV,    // current environment (development, production, etc.)
    DB_URI,      // database connection URI
    JWT_SECRET,  // secret key for signing JSON Web Tokens
    JWT_EXPIRES, // expiration time for JSON Web Tokens
    ARCJET_ENV,  // environment for Arcjet
    ARCJET_KEY } // API key for Arcjet
const dotenv = require('dotenv');

// load environment variables based on NODE_ENV
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

const { PORT, 
    NODE_ENV, 
    DB_URI,
JWT_SECRET,
JWT_EXPIRES, ARCJET_ENV, ARCJET_KEY } = process.env;


module.exports = {PORT, 
    NODE_ENV, 
    DB_URI,
JWT_SECRET,
JWT_EXPIRES,
ARCJET_ENV,
ARCJET_KEY }
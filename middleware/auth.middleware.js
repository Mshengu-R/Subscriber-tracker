const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const User = require('../models/user.models');
const { logger } = require('./logging.middleware');

const authorize = async (req, res, next) => {
    
    try{

        let token;

        const authHeader = req.headers.authorization;

        if(authHeader && authHeader.startsWith('Bearer')) {
         
         // grab the token string
         token = authHeader.split(' ')[1];    
        
        }

        if(!token) {
            logger.warn('Authorization failed: No token provided');
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // verify the token and decode the payload
        const decoded = jwt.verify(token, JWT_SECRET);

        // find the user in the database using the userId from the token payload
        const user = await User.findById(decoded.userId)

        if(!user) {
            logger.warn('Authorization failed: User not found for token');
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user; //check if the user still exists from the database

        // pass the request to the next middleware or route handler
        if(req.logger) req.logger.info({ message: 'User authorized', userId: user._id });
        
        next()
        
       } catch(error){
        
        logger.error({ message: 'Authorization error', error: error.message });
       
        res.status(401).json({ message: 'Unauthorised', error: error.message })
    }
}

module.exports = authorize;
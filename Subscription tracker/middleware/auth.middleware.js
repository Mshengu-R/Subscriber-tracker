const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const User = require('../modules/user.models');

const authorize = async (req, res, next) => {
    
    try{

        let token;

        // check if the authorization header exists and starts with 'Bearer'
        const authHeader = req.headers.authorization;

        // if the header exists and starts with 'Bearer', extract the token
        if(authHeader && authHeader.startsWith('Bearer')) {
         
         // grab the token string
         token = authHeader.split(' ')[1];    
        
        }

        if(!token) 
            return res.status(401).json({ message: 'Unauthorized' });

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.userId)

        req.user = user; //check if the user still exists from the database

        next()
        
       } catch(error){

        res.status(401).json({ message: 'Unauthorised', error: error.message })
    }
}

module.exports = authorize;
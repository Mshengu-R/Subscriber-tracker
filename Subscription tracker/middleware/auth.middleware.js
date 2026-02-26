const jwt = require('jsonwebtoken');
const { JWT_SECRETE } = require('../config/env');
const User = require('../modules/user.models');

const authorize = async(req, res, next) => {
    
    try{

        let token;

        const authHeader = req.headers.authorization;

        if(authHeader && authHeader.startsWith('Bearer') ){
            
         token = authHeader.split(' ')[1];    
        
        }

        if(!token) return res.status(401).json({ message: 'Unauthorized' });

        const decoded = jwt.verify(token, JWT_SECRETE);

        const user = await User.findById(decoded.userId)

        req.user = user; //check if the user still exists from the database

        next()
       } catch(error){

        res.status(401).json({ message: 'Unauthorised', error: error.message })
    }
}

module.exports = authorize;
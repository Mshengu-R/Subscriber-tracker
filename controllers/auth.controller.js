// controllers for 

const { JWT_EXPIRES, JWT_SECRET} = require('../config/env');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');
const bcrypt = require('bcrypt');

// POST /api/v1/users - create a new user
const signUp = async (req, res, next)=>{
    //sign up logic
    
    const session = await mongoose.startSession(); // Atomic operation
    session.startTransaction();

    try{
        const { gender, status, name, email, phone, password} = req.body;

        // find the existing user using the email
        const existingUser = await User.findOne( { email } );

        // for when the user is trying to sign up, this is for monitoring the situation
        req.logger.info({ message: 'User signup attempt started', email });

        if(existingUser){

            const error = new Error( 'User already exists' );
            error.statusCode = 409;
            throw error;
        }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
        
    // Use sessions, just in case something goes wrong 
  const newUsers = await User.create([{ gender, status, name, email, password: hashedPassword, phone }], { session })
  const token = jwt.sign({ userId: newUsers._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  
        // for when the user has fully signed up
        req.logger.info({ message: 'User signup successful', userId: newUsers[0]._id });
  
   
  await session.commitTransaction();
        session.endSession();


        res.status(201).json({
            success: true,
            message:  'User created successfully',
            data: {
                token,
                user: newUsers
            }
        });

    }catch(error){

        // add the one for when the user has failed to sign in
        req.logger.error({ message: 'User signup failed', error: error.message });

        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}


// POST /api/v1/users/signin - sign in a user
const signIn = async (req, res, next)=>{
    
   
  try{
    
    const { email, password } = req.body;
    req.logger.info({ message: 'User signin attempt', email });

  const user = await User.findOne({ email });

  if(!user){
    req.logger.warn({ message: 'Signin failed: user not found', email });
    const error = new Error('User with this email does not exist');
    error.statusCode = 404;
    throw error;
  };

  const validPassword = await bcrypt.compare(password, user.password)

    if(!validPassword){
        req.logger.warn({ message: 'Signin failed: invalid password', email });
        const error = new Error('Invalid password');
        error.statusCode = 401;
        throw error
    };

    // I am not adding the transaction session so no need for the element NB its just a sign in
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES } );
    req.logger.info({ message: 'User signin successful', userId: user._id });

    res.status(200).json({
        success: true,
        message: 'User signed in successfully',
        data: {
            token,
            user
        }
    });

} catch(error) {
    req.logger.error({ message: 'User signin failed', error: error.message });
    next(error)
  
}

}


const signOut = async (req, res, next)=>{

    try {
        req.logger.info({ message: 'User signout', userId: req.user?.id });
        // placeholder implementation until fully built
        res.status(501).json({ success: false, message: 'signOut not implemented yet' });
    } catch(error) {
        req.logger.error({ message: 'User signout failed', error: error.message });
        next(error);
    }
}




module.exports = {
    signIn,     // sign in a user
    signOut,    // sign out a user
    signUp      // sign up a user
}
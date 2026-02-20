const { JWT_EXPIRES, JWT_SECRET} = require('../config/env');
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../modules/user.models')
const bcrypt = require('bcrypt')

const signUp = async (req, res, next)=>{
    //sign up logic
    
    const session = await mongoose.startSession(); // Atomic operation
    session.startTransaction();

    try{
        const { name, email, password} = req.body;

        const existingUser = await User.findOne( { email } );

        if(existingUser){
            const error = new Error( 'User already exists' );
            error.statusCode = 409;
            throw error;
        }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
        

  const newUser = await User.create([{name, email, password: hashedPassword}], {session})
  const token = jwt.sign({userId: newUser[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES});
  
  
   
  await session.commitTransaction();
        session.endSession();


        res.status(201).json({
            success: true,
            message:  'User created successfully',
            data: {
                token,
                user: newUser[0]
            }
        })

    }catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error)
    }
}

const signIn = async (req, res, next)=>{
    // placeholder implementation until fully built
    res.status(501).json({ success: false, message: 'signIn not implemented yet' });
}

 const signOut = async (req, res, next)=>{
    // placeholder implementation until fully built
    res.status(501).json({ success: false, message: 'signOut not implemented yet' });
}

module.exports = {
    signIn,
    signOut,
    signUp
}
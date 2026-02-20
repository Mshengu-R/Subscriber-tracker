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

      const salt = crypto.randomBytes(10).toString('hex');
      const hashedPassword = crypto.scryptSync(password, salt, 64).toString('hex');
        

  const newUser = await User.create([{name, email, password: hashedPassword}], {session})
  const token = jwt.sign({userId: newUser[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES});
  
  
   
  await session.commitTransaction();
        session.endSession();


        res.status(201).json({
            success: true,
            message:  'User created sucesfully',
        data: {
            token,
            user: newUsers[0]

        }})

    }catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error)
    }
}

const signIn = async (req, res, next)=>{
    //sign up logic

}

 const signOut = async (req, res, next)=>{
    //sign up logic
    
}

module.exports = {
    signIn,
    signOut,
    signUp
}
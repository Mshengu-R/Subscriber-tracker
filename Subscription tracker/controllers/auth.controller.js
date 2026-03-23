// controllers for authorization

const { JWT_EXPIRES, JWT_SECRET} = require('../config/env');
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../modules/user.models');
const bcrypt = require('bcrypt');


const signUp = async (req, res, next)=>{
    
    const session = await mongoose.startSession(); // Atomic operation
    session.startTransaction();

    try{
  
        const { gender, status, name, email, phone, password} = req.body;

        // check if user exist using the phone or email
        // finds one where the email/phone is the same with the one which the unknown user is trying to create with
        const existingUserEmail = await User.findOne( { email } );
        const existingUserPhone = await User.findOne( { phone } );

        if(existingUserEmail || existingUserPhone){
            const message = 'User already exists';
            const error = new Error(message);
            error.statusCode = 409;
            throw error;

        }

      // hashing the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
        
    // I use sessions, just in case something goes wrong 
  const newUsers = await User.create([{ gender, status, name, email, password: hashedPassword, phone }], { session })
  const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  // sessions -> Part of the atomic operations just incase something goes wrong then we abort the transaction
  
   
  await session.commitTransaction();
        session.endSession();


        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                // this outputs the token given to the user
                token,
                user: newUsers[0]
            }
        });

    }catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

const signIn = async (req, res, next)=>{
    
   
  try{
    
    const { email, password } = req.body;

  // const userPhone = await User.findOne({ phone })  -> later to impliment if the user 
  // const userEmail = await User.findOne({ email })   
  const user = await User.findOne({ email });

  if(!user){
    const message = 'User with this email does not exist';
    const error = new Error(message);
    error.statusCode = 404;
    throw error;
  };

  const validPassword = await bcrypt.compare(password, user.password)

    if(!validPassword){
        const message = 'Invalid password';
        const error = new Error(message);
        error.statusCode = 401;
        throw error
    };

    // I am not adding the transaction session so no need for the element NB its just a sign in
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES } );

    res.status(200).json({
        success: true,
        message: 'User signned in successfully',
        data: {
            token,
            user
        }
    });

} catch(error) {

    next(error)
  
}

}


const signOut = async (req, res, next)=>{

    // const token = req.headers.authorization?.split(' ')[1];
    // // const endSession = await mongoose.disconnect();

    // if(!token){
    //     const error = new Error('No token provided');
    //     error.statusCode = 401;
    //     return next(error);
    // }

    // try{

        // Invalidate the token by adding it to a blacklist (you can implement this with a database or in-memory store)
        // For simplicity, we will just return a success message here
        res.status(200).json({
            success: true,
            message: 'User signed out successfully'
        });

        // process.exit(1);
        // endSession;
    // } 
    // catch(error) {
    // next(error);
    
} 


module.exports = {
    signIn,
    signOut,
    signUp
} 
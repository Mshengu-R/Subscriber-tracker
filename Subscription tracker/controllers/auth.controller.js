// controllers for 

const { JWT_EXPIRES, JWT_SECRET} = require('../config/env');
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../modules/user.models');
const bcrypt = require('bcrypt');


const signUp = async (req, res, next)=>{
    //sign up logic
    
    const session = await mongoose.startSession(); // Atomic operation
    session.startTransaction();

    try{
        const { gender, status, name, email, phone, password} = req.body;

        const existingUser = await User.findOne( { email } );

        if(existingUser){

            const error = new Error( 'User already exists' );
            error.statusCode = 409;
            throw error;
        }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
        
    // Use sessions, just in case something goes wrong 
  const newUsers = await User.create([{ gender, status, name, email, password: hashedPassword, phone }], { session })
  const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  
  
   
  await session.commitTransaction();
        session.endSession();


        res.status(201).json({
            success: true,
            message:  'User created successfully',
            data: {
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
    
    // placeholder implementation until fully built
  try{
    const { email, password } = req.body;

  const user = await User.findOne({ email });

  if(!user){
    const error = new Error('User with this email does not exist');
    error.statusCode = 404;
    throw error;
  };

  const validPassword = await bcrypt.compare(password, user.password)

    if(!validPassword){
        const error = new Error('Invalid password');
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

    // placeholder implementation until fully built
    res.status(501).json({ success: false, message: 'signOut not implemented yet' });
}

module.exports = {
    signIn,
    signOut,
    signUp
}
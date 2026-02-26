const mongoose = require('mongoose');
const User = require('./modules/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config/env');




const freq = ['daily', 'weekly', 'monthly', 'yearly'];

const renewalPeriods = { 
    daily: 1,
    weekly: 7,
    monthly: 30,
    yearly: 365
};

let renewalDate;

const startDay = new Date();
renewalDate = new Date(startDay);


console.log('Subscribed on:', startDay);
const renewOn = renewalDate.setDate(renewalDate.getDate() + renewalPeriods[freq[2]]);

console.log('Renew your subscription on:', new Date(renewOn));

// console.log('Renew your subscription on:', startDay.getDate(new Date));
// const startDate = startDay.getDate(new Date)

// const days = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 
//                  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 
//                  20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
//                 31 ]

//                 const expired = days.filter(out);

//                 console.log('You will be given extra', expired, 'days else your subscription will be expired')

// function out(element){
//     return element > (startDate + 2); 
// }



const details = {
     gender: 'male',
     status: 'Mr',
     name: 'Risima Chabalala',
     password: '1520456',
     phone: '0635257847',
}

const userSignIn = async (req, res, next)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const { gender, status, name, email, password, phone } = req.body;

        const existingUser = await User.findOne({ email });

        if(existingUser){
            error = new Error('User with this email already exists');
            error.statusCode = 409;
            throw error
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({gender, status, name, password: hashedPassword, phone }, { session });
        const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, {expiresIn: '1d'});

        res.status(201).json({
            success: true,
            message: 'New User created',
            data: {
                token,
                user: newUser,
            }

        })




    }catch(error){
        // error = new Error('Something went wrong')
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}
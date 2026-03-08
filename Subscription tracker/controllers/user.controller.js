const User = require("../modules/user.models")
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
// controller for user-related endpoints

// POST /api/v1/users - create a new user
const createUser = async (req, res, next) => {

    try{

        // since I dont have front end of this application, the user stricly will have to enter what's here
        const {gender, status, name, email, password, age, phone} = req.body;

        const user = await User.create({
            gender, status, name, email, password, phone, age
        });


        res.status(201).json({
            token: jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' }),
            success: true,
            data: user
        });

    }catch(error) {
        next(error);
    }
}

// GET /api/v1/users - list all users
const getUsers = async (req, res, next) => {

    try{
        
        const users = await User.find();

        res.status(200).json({
            success: true,
            data: users
        });

    } catch(error){

        next(error) //foward it to the error handling middleware
    }
};

// GET /api/v1/users/:id
const getUser = async (req, res, next) => {

    try{

        // const { email, password } = req.body;
        //  const user = User.find(u => u.email === email && u.password === password)

        const user = await User.findById(req.params.id).select('-password');

        if(!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: user
        });

    } catch(error){
        
        next(error) //foward it to the error handling middleware
    }
}

// DELETE /api/v1/users/:id/delete - delete a user
const deleteUser = async (req, res, next) => {

    try{

        if(req.user.id !== req.params.id){
            const error = new Error('User unidentified');
            error.status = 401;
            throw error;

        }

        const user = await User.findByIdAndDelete(req.params.id)

        res.status(200).json({ 
             
             success: true,
             data: user })


    } catch(error){

        next(error);
    }

}

// PUT /api/v1/users/:id/update - update a user
const updateUser = async (req, res, next) => {

    try{

        if(req.user.id !== req.params.id){
            
            const error = new Error('User is unidentified');
            error.status = 401;
            throw error;
        }

        const user = await User.findByIdAndUpdate( req.params.id, req.body, { new: true });

        res.status(200).json({
            success: true,
            data: user
        })

    }catch(error) {

        next(error);
    }
}


module.exports = { getUsers, getUser, createUser, deleteUser, updateUser };
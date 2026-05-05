const User = require("../models/user.models")
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
// controller for user-related endpoints



// GET /api/v1/users - list all users
const getUsers = async (req, res, next) => {

    try{
        req.logger.info({ message: 'Fetching all users' });
        const users = await User.find();
        req.logger.info({ message: 'All users retrieved successfully', count: users.length });

        res.status(200).json({
            success: true,
            data: users
        });

    } catch(error){
        req.logger.error({ message: 'Failed to fetch all users', error: error.message });
        next(error) //foward it to the error handling middleware
    }
};

// GET /api/v1/users/:id
const getUser = async (req, res, next) => {

    try{
        req.logger.info({ message: 'Fetching user by ID', targetUserId: req.params.id });
        const user = await User.findById(req.params.id).select('-password');

        if(!user) {
            req.logger.warn({ message: 'User not found', userId: req.params.id });
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        req.logger.info({ message: 'User retrieved successfully', userId: user._id });

        res.status(200).json({
            success: true,
            data: user
        });

    } catch(error){
        req.logger.error({ message: 'Failed to fetch user', error: error.message });
        next(error) //foward it to the error handling middleware
    }
}

// DELETE /api/v1/users/:id/delete - delete a user
const deleteUser = async (req, res, next) => {

    try{
        req.logger.info({ message: 'Deleting user', userId: req.params.id });
        if(req.user.id !== req.params.id){
            req.logger.warn({ message: 'Unauthorized user deletion attempt', requesterId: req.user.id, targetUserId: req.params.id });
            const error = new Error('User unidentified');
            error.statusCode = 403;
            throw error;

        }

        const user = await User.findByIdAndDelete(req.params.id)
        req.logger.info({ message: 'User deleted successfully', userId: user._id });
        res.status(200).json({ 
             
             success: true,
             data: user })


    } catch(error){
        req.logger.error({ message: 'Failed to delete user', error: error.message });
        next(error);
    }

}

// PUT /api/v1/users/:id/update - update a user
const updateUser = async (req, res, next) => {

    try{
        req.logger.info({ message: 'Updating user', userId: req.params.id });
        if(req.user.id !== req.params.id){
            req.logger.warn({ message: 'Unauthorized user update attempt', requesterId: req.user.id, targetUserId: req.params.id });
            
            const error = new Error('User is unidentified');
            error.statusCode = 403;
            throw error;
        }

        const user = await User.findByIdAndUpdate( req.params.id, req.body, { new: true });
        req.logger.info({ message: 'User updated successfully', userId: user._id });
        res.status(200).json({
            success: true,
            data: user
        })

    }catch(error) {
        req.logger.error({ message: 'Failed to update user', error: error.message });
        next(error);
    }
}


module.exports = { getUsers, getUser, deleteUser, updateUser };
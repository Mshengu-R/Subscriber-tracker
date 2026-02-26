const User = require("../modules/user.models")

// controller for user-related endpoints
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

// /api/v1/users/:id
const getUser = async (req, res, next) => {

    try{

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

module.exports = { getUsers, getUser}
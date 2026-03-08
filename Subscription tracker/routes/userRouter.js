const express = require('express');
const { getUser, getUsers, createUser, updateUser, deleteUser } = require('../controllers/user.controller');
const authorize = require('../middleware/auth.middleware');
const userRouter = express.Router();

// /api/v1/users - get all users
userRouter.get('/', authorize,  getUsers)

// /api/v1/users/:id - get a single user by id
userRouter.get('/:id', authorize, getUser)

// /api/v1/users - create a new user
//  no id we dont know the user
userRouter.post('/', createUser);

// /api/v1/users/:id/update - update user
userRouter.put('/:id/update', authorize, updateUser);

// /api/v1/users/:id/delete - create a new user
userRouter.delete('/:id/delete', authorize, deleteUser)


module.exports = userRouter;
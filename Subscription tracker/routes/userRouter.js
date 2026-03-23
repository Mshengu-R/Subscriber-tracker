const express = require('express');
const { getUser, getUsers, updateUser, deleteUser } = require('../controllers/user.controller');
const authorize = require('../middleware/auth.middleware');
const { signIn, signUp } = require('../controllers/auth.controller');
const userRouter = express.Router();

// /api/v1/users - get all users
userRouter.get('/', authorize, getUsers);

// /api/v1/users/:id - get a single user by id
userRouter.get('/:id', authorize, signIn);

// /api/v1/users/:id/update - update user
userRouter.put('/:id/update', authorize, updateUser);

// /api/v1/users/sign-up - create a new user
userRouter.post('/sign-up', signUp );

// /api/v1/users/:id/delete - delete a user
userRouter.delete('/:id/delete', authorize, deleteUser)


module.exports = userRouter;
const express = require('express');
const { getUsers, updateUser, deleteUser } = require('../controllers/user.controller');
const authorize = require('../middleware/auth.middleware');
const { signIn, signUp } = require('../controllers/auth.controller');
const roleMiddleware = require('../middleware/role.middleware');
const { validate, userValidationSchema } = require('../middleware/validate');
const userRouter = express.Router();

// /api/v1/users - get all users
userRouter.get('/admin', authorize, );


// /api/v1/users - get all users
userRouter.get('/', authorize, roleMiddleware('admin', 'manager'), getUsers);

// /api/v1/users/:id - get a single user by id
userRouter.get('/:id', authorize, roleMiddleware('admin', 'manager', 'customer'), signIn);

// /api/v1/users - create a new user
//  no id we dont know the user
userRouter.post('/', validate(userValidationSchema), signUp);


// /api/v1/users/:id/update - update user
userRouter.put('/:id/update', authorize, roleMiddleware('admin', 'manager', 'customer'), updateUser);

// /api/v1/users/:id/delete - delete a user
userRouter.delete('/:id/delete', authorize, roleMiddleware('admin', 'manager', 'customer'), deleteUser);


module.exports = userRouter;
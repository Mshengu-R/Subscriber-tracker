const express = require('express');
const {getUser, getUsers, updateUser, deleteUser } = require('../controllers/user.controller');

const roleMiddleware = require('../middleware/role.middleware');
const authorize = require('../middleware/auth.middleware');

const userRouter = express.Router();

// /api/v1/users - get all users -> Only admins and managers can access this routes
userRouter.get('/', authorize, roleMiddleware('admin', 'manager'), getUsers);

// /api/v1/users/:id - get a single user by id -> Only customers, admins and managers can access this routes
userRouter.get('/:id', authorize, roleMiddleware('admin', 'manager', 'customer'), getUser);

// /api/v1/users/:id/update - update user -> Only customers, admins and managers can access this routes
userRouter.put('/:id/update', authorize, roleMiddleware('admin', 'manager', 'customer'), updateUser);

// /api/v1/users/:id/delete - delete a user -> Only customers, admins and managers can access this routes
userRouter.delete('/:id/delete', authorize, roleMiddleware('admin', 'manager', 'customer'), deleteUser)


module.exports = userRouter;
const express = require('express');
const { getUser, getUsers } = require('../controllers/user.controller');
const authorize = require('../middleware/auth.middleware');
const userRouter = express.Router();

// /api/v1/users
userRouter.get('/', authorize,  getUsers)

// /api/v1/users/:id
userRouter.get('/:id', authorize, getUser)


userRouter.post('/', (req, res)=>{
    res.json({message: "Create new user"})
})

userRouter.put('/:id', (req, res)=>{
    res.json({message: "Update user"})
})

userRouter.delete('/:id', (req, res)=>{
    res.json({message: "Delete users"})
})


module.exports = userRouter;
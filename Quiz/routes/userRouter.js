const express = require('express');
const userRouter = express.Router();

// for getting all the users
userRouter.get('/users', (req, res)=>{
    res.json({message: "Get all users"})
})

// for getting a specific user
userRouter.get('/:id', (req, res)=>{
    res.json({message: "Get user details"})
})

// Users unknown hence no id required
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

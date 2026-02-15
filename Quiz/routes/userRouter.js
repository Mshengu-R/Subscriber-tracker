const express = require('express');
const userRouter = express.Router();

userRouter.get('/users', (req, res)=>{
    res.json({message: "Get all users"})
})

userRouter.get('/:id', (req, res)=>{
    res.json({message: "Get user details"})
})

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
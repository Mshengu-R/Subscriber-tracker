const express = require('express');
const authRouter = express.Router();


// 
authRouter.post('/sing-up', (req,res)=>{
    res.json({message: "Sign-up"})
})

authRouter.post('/sing-in', (req,res)=>{
    res.json({message: "Sign-in"})
})

authRouter.post('/sing-out', (req,res)=>{
    res.json({message: "Sign-out"})
})


module.exports = authRouter;
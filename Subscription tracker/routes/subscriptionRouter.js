const express = require('express');
const subRouter = express.Router();

subRouter.get('/', (req,res)=>{
             res.json({message: "Subscribe"})
})

subRouter.get('/:id', (req,res)=>{
              res.json({message: "Get subscription details"})
})

subRouter.post('/', (req,res)=>{
             res.json({message: "Create subscription"})
})

subRouter.put('/:id', (req,res)=>{
             res.json({message: "Update Subscription"})
})

subRouter.delete('/:id', (req,res)=>{
             res.json({message: "Delete Subscription"})
})

// the subscription for the specific user
subRouter.get('/user/:id', (req,res)=>{
             res.json({message: "Get all user subscriptions"})
})

subRouter.put('/:id/cancel', (req,res)=>{
             res.json({message: "Cancel Subscription"})
})

subRouter.put('/upcoming-renewals', (req,res)=>{
             res.json({message: "Get upcoming renewals"})
})


module.exports = subRouter;
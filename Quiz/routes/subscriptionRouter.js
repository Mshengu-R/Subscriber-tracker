// routes with /:id requires the user to be having a certain id
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
// requires and id for the user
subRouter.get('/user/:id', (req,res)=>{
    res.json({message: "Get all user Subscriptions"})
})

// routes for canceling the subscription
// requires and id for the user
subRouter.put('/:id/cancel', (req,res)=>{
    res.json({message: "Cancel Subscription"})
})

// route for upcomming renewals
subRouter.put('/upcomming-renewals', (req,res)=>{
    res.json({message: "Get upcomming renewals"})
})



module.exports = subRouter;

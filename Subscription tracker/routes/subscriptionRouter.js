const express = require('express');
const subRouter = express.Router();
const authorize = require('../middleware/auth.middleware');
const { createSubscription, getSubscription, updateSubscription, deleteSubscription } = require('../controllers/subscription.controller');

subRouter.get('/', (req,res)=>{
             res.json({message: "Subscribe"})
})

subRouter.get('/user/:id', authorize, getSubscription )

subRouter.post('/', authorize, createSubscription);

subRouter.put('/:id', authorize, updateSubscription);

subRouter.delete('/:id', authorize, deleteSubscription);    

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
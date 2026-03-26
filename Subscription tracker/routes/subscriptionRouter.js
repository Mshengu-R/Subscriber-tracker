const express = require('express');
const subRouter = express.Router();
const authorize = require('../middleware/auth.middleware');
const { createSubscription,
        getUserSubscription, 
        updateSubscription, 
        deleteSubscription  } = require('../controllers/subscription.controller');

subRouter.get('/', (req,res)=>{
             res.json({message: "Subscribe"})
})

// GET /api/v1/subscriptions/user/:id - list all subscriptions for the authenticated user
subRouter.get('/user/:id', authorize, getUserSubscription )

// POST /api/v1/subscriptions - create a new subscription for the authenticated user
subRouter.post('/', authorize, createSubscription);

// PUT /api/v1/subscriptions/:id - update a subscription by ID for the authenticated user
subRouter.put('/:id', authorize, updateSubscription);

// DELETE /api/v1/subscriptions/:id - delete a subscription by ID for the authenticated user
subRouter.delete('/:id', authorize, deleteSubscription);    


subRouter.put('/:id/cancel', (req,res)=>{
             res.json({message: "Cancel Subscription"})
})

subRouter.put('/:id/upcoming-renewals', (req,res)=>{
             res.json({message: "Get upcoming renewals"})
})


module.exports = subRouter;
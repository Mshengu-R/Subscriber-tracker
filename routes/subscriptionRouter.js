const express = require('express');
const subRouter = express.Router();
const authorize = require('../middleware/auth.middleware');
const { createSubscription,
        getSubscription,
        updateSubscription,
        deleteSubscription,
        cancelSubscription } = require('../controllers/subscription.controller');
const { validate, subscriptionValidationSchema } = require('../middleware/validate');

subRouter.get('/', (req, res)=>{
             res.status(200).json({message: "Subscribe "})
})

// the subscription for the specific user
subRouter.get('/user/:id', authorize, getSubscription )

subRouter.post('/', authorize, validate(subscriptionValidationSchema), createSubscription);

subRouter.put('/:id', authorize, validate(subscriptionValidationSchema), updateSubscription);

subRouter.delete('/:id', authorize, deleteSubscription);    

subRouter.put('/:id/cancel', authorize, cancelSubscription);

subRouter.put('/upcoming-renewals', (req,res)=>{
             res.status(200).json({message: "Get upcoming renewals"})
})


module.exports = subRouter;
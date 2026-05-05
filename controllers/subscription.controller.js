const Subscription = require('../models/subscription.model');


const createSubscription = async (req, res, next) => {

    try{
        req.logger.info({ message: 'Creating new subscription', userId: req.user._id });
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        req.logger.info({ message: 'Subscription created successfully', subscriptionId: subscription._id });

        res.status(201).json({ 
            success: true, 
            data: subscription })

    } catch(error) {
        req.logger.error({ message: 'Failed to create subscription', error: error.message });
        next(error)
    }
}

const getSubscription = async (req, res, next) => {
    req.logger.info({ message: 'Fetching subscriptions', userId: req.params.id });
  
    try{

        if(req.user.id.toString() !== req.params.id){
            req.logger.warn({ message: 'Unauthorized subscription access attempt', userId: req.user.id, targetUserId: req.params.id });
            const error = new Error('You are not the owner of the subscription/account');
            error.statusCode = 403;
            throw error;
        }

        const subscription =  await Subscription.find({ user: req.params.id });
        req.logger.info({ message: 'Subscriptions retrieved successfully', count: subscription.length });
        res.status(200).json({ success: true, data: subscription })

    } catch(error) {
        req.logger.error({ message: 'Failed to fetch subscriptions', error: error.message });
        next(error);
    }
}

const updateSubscription = async (req, res, next) => {

        try{
            req.logger.info({ message: 'Updating subscription', subscriptionId: req.params.subscriptionId, userId: req.user.id });
            if(req.user.id !== req.params.userId ) {
                req.logger.warn({ message: 'Unauthorized subscription update attempt', userId: req.user.id, targetUserId: req.params.userId });
                const error = new Error('Subscription unidentified');
                error.statusCode = 403;
                throw error;

            }

            const subscription = await Subscription.findByIdAndUpdate(
                req.params.subscriptionId,
                req.body,
                { new: true }
            );

            req.logger.info({ message: 'Subscription updated successfully', subscriptionId: subscription._id });
            res.status(200).json({ success: true, data: subscription });

        } catch(error) {
            req.logger.error({ message: 'Failed to update subscription', error: error.message });
            next(error);
        }


}

const deleteSubscription = async (req, res, next) => {

    try{
        req.logger.info({ message: 'Deleting subscription', subscriptionId: req.params.subscriptionId, userId: req.user.id });

        if(req.user.id !== req.params.userId ) {
            req.logger.warn({ message: 'Unauthorized subscription deletion attempt', userId: req.user.id, targetUserId: req.params.userId });
            const error = new Error('Subscription unidentified');
            error.statusCode = 403;
            throw error;

        }

        const subscription = await Subscription.findByIdAndDelete(req.params.subscriptionId);
        req.logger.info({ message: 'Subscription deleted successfully', subscriptionId: subscription._id });
        res.status(200).json({ success: true, data: subscription });

    } catch(error) {
        req.logger.error({ message: 'Failed to delete subscription', error: error.message });
        next(error);
    }
}

const cancelSubscription = async (req, res, next) => {
    try{
        req.logger.info({ message: 'Canceling subscription', subscriptionId: req.params.id, userId: req.user.id });

        // Find subscription first
        const subscription = await Subscription.findById(req.params.id);

        if(!subscription) {
            req.logger.warn({ message: 'Subscription not found for cancellation', subscriptionId: req.params.id });
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        // Check if user owns this subscription
        if(subscription.user.toString() !== req.user._id.toString()) {
            req.logger.warn({ message: 'Unauthorized subscription cancellation attempt', userId: req.user.id, subscriptionOwnerId: subscription.user });
            const error = new Error('You are not authorized to cancel this subscription');
            error.statusCode = 403;
            throw error;
        }

        // Check if subscription is already cancelled or expired
        if(subscription.status === 'cancelled') {
            
            req.logger.warn({ message: 'Subscription already cancelled', subscriptionId: subscription._id });
            const error = new Error('This subscription is already cancelled');
            error.statusCode = 400;
            throw error;
        }

        // Update subscription status to cancelled
        const cancelledSubscription = await Subscription.findByIdAndUpdate(
            req.params.id,
            { 
                status: 'cancelled',
                cancelledDate: new Date()
            },
            { new: true }
        );

        req.logger.info({ message: 'Subscription cancelled successfully', subscriptionId: cancelledSubscription._id, cancelledDate: cancelledSubscription.cancelledDate });
        
        res.status(200).json({ 
            success: true, 
            message: 'Subscription cancelled successfully',
            data: cancelledSubscription 
        });

    }catch(error){
        req.logger.error({ message: 'Failed to cancel subscription', error: error.message });
        next(error)
    }
}

module.exports = { createSubscription, getSubscription, updateSubscription, deleteSubscription, cancelSubscription };
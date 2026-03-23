const Subscription = require('../modules/subscription.model');


const createSubscription = async (req, res, next) => {

    try{

        const subscription = await Subscription.create({
            
            // to know which user is trying to create the subscription
            // this is from the auth middleware
            ...req.body,
            user: req.user._id, 
        });

        res.status(201).json({ 
            success: true,
            message: 'Your subscription has been succesfully created',
            data: subscription })

    } catch(error) {

        next(error)
    }
}

const getUserSubscription = async (req, res, next) => {
  
    try{
        // for the currently logged user trying to get its subscription
        if(req.user.id.toString() !== req.params.id){
            const message = 'You are not the owner of the subscription/account';
            const error = new Error(message);
            error.status = 401;
            throw error;
        }

        // when the owner is verified
        const subscription =  await Subscription.find({ user: req.params.id });

        res.status(200).json({ success: true, data: subscription })

    } catch(error) {
        
        next(error);
    }
}

const updateSubscription = async (req, res, next) => {

        try{

            if(req.user.id !== req.params.userId ) {

                const error = new Error('Subscription unidentified');
                error.status = 401;
                throw error;

            }

            const subscription = await Subscription.findByIdAndUpdate(
                req.params.subscriptionId,
                req.body,
                { new: true }
            );
            
            res.status(200).json({ success: true, data: subscription });

        } catch(error) {

            next(error);
        }


}

const deleteSubscription = async (req, res, next) => {

    try{

        if(req.user.id !== req.params.userId ) {

            const message = 'Subscription unidentified';
            const error = new Error(message);
            error.status = 401;
            throw error
        }

        const subscription = await Subscription.findByIdAndDelete(req.params.subscriptionId);

        res.status(200).json({ success: true, data: subscription });

    } catch(error) {

        next(error);
    }
}

const cancelSubscription = async (req, res, next) => {
    try{

        if(req.user.id !== req.params.userId) {
            const message = 'Subscription unidentified';
            const error = new Error(message);
            error.status = 401;
            throw error
        }

    }catch(error){
        next(error)
    }
}

module.exports = {  createSubscription,
                    getUserSubscription,
                    updateSubscription,
                    deleteSubscription };
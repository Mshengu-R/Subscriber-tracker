const Subscription = require('../modules/subscription.model');


const createSubscription = async (req, res, next) => {

    try{

        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        res.status(201).json({ 
            success: true, 
            data: subscription })

    } catch(error) {

        next(error)
    }
}

const getSubscription = async (req, res, next) => {
  
    try{

        if(req.user.id.toString() !== req.params.id){
            const error = new Error('You are not the owner of the subscription/account');
            error.status = 401;
            throw error;
        }

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

            const error = new Error('Subscription unidentified');
            error.status = 401;
            throw error;

        }

        const subscription = await Subscription.findByIdAndDelete(req.params.subscriptionId);

        res.status(200).json({ success: true, data: subscription });

    } catch(error) {

        next(error);
    }
}

const cancelSubscription = async (req, res, next) => {
    try{

    }catch(error){
        next(error)
    }
}

module.exports = { createSubscription, getSubscription, updateSubscription, deleteSubscription };
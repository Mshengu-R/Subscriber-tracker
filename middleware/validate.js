const joi = require('joi');

const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
    
        // If validation fails, send a 400 response with the error message
        if(error) {

            res.status(400).json({ success: false, error: error.details[0].message });
        } 
        else {
            next();
         }
    }
}

const userValidationSchema = joi.object({

    gender: joi.string().valid('male', 'female').required(),
    name: joi.string().min(3).max(100).required(),
    status: joi.string().valid('Dr', 'Mr', 'Mrs', 'Miss', 'Professor').required(),
    email: joi.string().email().required(),
    phone: joi.string().length(10).pattern(/^[0-9]+$/).required(),
    password: joi.string().min(6).required(),
    role: joi.string().valid('customer', 'admin', 'manager').required()

});

// validation for signin
const signInValidationSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});

// validation for making a subscription
const subscriptionValidationSchema = joi.object({

    name: joi.string().min(3).max(100).required(),
    price: joi.number().positive().required(),
    frequency: joi.string().valid('daily', 'weekly', 'monthly', 'yearly').required(),
    category: joi.string().valid('sport', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other').required(),
    paymentMethod: joi.string().required(),
    // startDate: joi.date().less('now').required(),
    duration: joi.number().positive().required(),
    features: joi.array().items(joi.string()).required()

});

module.exports = {
    validate,
    userValidationSchema,
    signInValidationSchema,
    subscriptionValidationSchema
}
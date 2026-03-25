// We use mongoose to set how our database will looklike

const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100
    },

    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'Price must be greater than 0'] 
    },

    currency: {
        type: String,
        enum: ['ZAR', 'USD', 'EUR'],
        default: 'ZAR',
    },
  
    // how often you are getting charged for the subscription
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    
    // to know where the user is spending the most
    category: {
        type: String,
        enum: ['sport', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other'],
        required: true,
    },

    paymentMethod: { // how the user is paying for the subscription
        type: String,
        enum: ['ApplePay', 'Debit Card', 'Credit Card', 'PayPal', 'Other'],
        required: true,
        trim: true,
    },

    // status of the subscription
    status: { 
        type: String,
        required: true,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active',
    },

    // startdate of the subscription
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value)=> value < new Date(),
            message: "Start date must be in the past",
        }
    },

    // renewal date of the subscription
    renewalDate: {
        type: Date,
        validate: {
            validator: function(value){
                return value > this.startDate;
            },
            message: "Renewal date must be after the start date",
        }
    },

    user: { // user that actually subscribed
    type: mongoose.Schema.Types.ObjectId, // id -> the reference of the user model
    ref: 'User',
    required: true,
    index: true, // to optimise the query by indexing the user field
  }

}, {timestamps: true});

// auto calculate renewal date if missing
subscriptionSchema.pre('save', function(next){

  if(!this.renewalDate) {
    const renewalPeriods = {
        daily: 1,
        weekly: 7,
        monthly: 30,
        yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);

}

  if(this.renewalDate < new Date()){
   
    this.status = 'expired';
  
}

  next();
})

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
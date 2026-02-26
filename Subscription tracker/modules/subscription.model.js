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
    category: {
        type: String,
        enum: ['sport', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other'],
        required: true,
    },

    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },

    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active',
        // required: true,
    },

    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value)=> value < new  Date(),
            message: "Start date must be in the past",
        }
    },

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
    type: mongoose.Schema.Types.ObjectId,
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

const subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = subscription;
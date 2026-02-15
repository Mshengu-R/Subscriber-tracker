// We use mongoose to set how our database will looklike

const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100.

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
        default: 'active'
        // required: true,
        // trim: true
    },

    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value)=> value < newDate(),
            message: "Start date must be in the past",
        }
    },

    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value){ value < this.startDate;
        },
            message: "Start date must be in the past",
    }
},

user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  }

}, {timestamps: true});

// auto calculate renewal date if missing
subscriptionSchema.pre('save', function(next){

  if(!this.renewalDate) {
    const renewalDate = {
        daily: 1,
        weekly: 7,
        montly: 30,
        yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getData() + renewalPeriods[this.frequency]);

  }

  if(this,renewalDate < new Date()){
    this.status = 'expired';

    next()
  }
})
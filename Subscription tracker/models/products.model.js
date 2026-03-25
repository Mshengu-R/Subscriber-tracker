const mongoose = require('mongoose');
const { applyTimestamps } = require('./user.models');

const productsSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'The name of the products are required'],
        minLength: [3, 'The product name has to be at least 3 characters']
    },

    status: {
        type: String,
        enum: ['Not available', 'available', 'expired'],
        required: true
    },

    // This are for specific characteristics
    specifiChars: {
        type: String,
        required: true,
    },


    

}, { timestamps: true })

const Products = mongoose.model('products', productsSchema);

module.exports = Products;
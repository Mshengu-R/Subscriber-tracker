const mongoose = require('mongoose');
// setting up how we prefer our user data to be stored

const userSchema = new mongoose.Schema({
 
    name: {
        type: String,
        required: [true, 'User Name is require'],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },

    email: {
      type: String,
      required: [true, 'User Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
    },

  password: {
    type: String,
    required: [true, 'User Password is required'],
    minLength: 6,
    }

}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;
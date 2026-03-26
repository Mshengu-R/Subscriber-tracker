const mongoose = require('mongoose');
// setting up how we prefer our user data to be stored

const userSchema = new mongoose.Schema({
 
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female'] 
        },

    status: {
        type: String,
        required: true,
        enum: ['Dr', 'Mr', 'Mrs', 'Miss', 'Proffessor'],
      },

    name: {
        type: String,
        required: [true, 'User Name is required'],
        trim: true,
        minLength: [3,  'Username should at least be 3 characters'],
        maxLength: [20, 'Username should be less than 15 characters']
    },

    email: {
      type: String,
      required: [true, 'User Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
    },

      phone: {
      type: Number,
      required: true,
      // enum: ['+27', '+15', ]  // this is for making it to have those values from countries
      minLength: [10, 'South African number should at least be 10 numbers'],
      maxLength: [10, 'South African number should at least be 10 numbers'],
    },

  password: {
    type: String,
    required: [true, 'User Password is required'],
    minLength: 6,
    },

  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['customer', 'admin', 'manager'],
  }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
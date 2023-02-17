import mongoose from 'mongoose';
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        require: [true, 'Enter an email address.'],
        unique: [true, 'That email address is taken.'],
        dropDups: true,
        validate: [validator.isEmail, 'Enter a valid email address.'],
    },
    password: {
        type: String, 
        required: [true, 'Enter a password.'],
        minLength: [8, 'Password should be at least four characters'],
    },
    isAdmin: {
        type: Boolean, 
        required: true, 
        default:false
    },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;


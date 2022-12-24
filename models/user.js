const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
        minlength: 3,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please provide valid email.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: 8
    }
})

//we then want to define a middleware which runs before our User is saved as a document in our User collection
//we basically want to hash our password before we save it using bcryptjs
//using bcrypt we can generate salt (random characters that go before/after our hashed password)
//and we can then pass in our string password along with the salt value inside of our hashing function
//and we can then save this hashed password in our passsword property of this user's document. 

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
})

userSchema.methods.createJWT = function () {
    return jwt.sign({userID:this._id}, process.env.JWT_SECRET, {expiresIn: '5d'}); 
}

module.exports = mongoose.model('User', userSchema);



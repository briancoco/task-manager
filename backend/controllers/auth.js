const {StatusCodes} = require('http-status-codes');
const CustomAPIError = require('../errors/custom-error');
require('express-async-errors');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const register = async (req, res) => {
    //we want to validate our user's input using mongoose validation
    //if it's valid then we want to hash our password and then store it inside our database
    //we then want to create our token and send back the token.
    const user = await User.create(req.body);
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({email:user.email, token});
}

const login = async (req, res) => {
    //for login we want to get the user info from req.body
    //we then want to find the user in our document using the email
    //if it exists then use bcrypt to compare the passwords
    //if it does not exist, throw an error
    const {email, password} = req.body;
    if(!email || !password) {
        throw new CustomAPIError(StatusCodes.BAD_REQUEST, "Please provide both email and password");
    }
    const user = await User.findOne({email});
    if(!user) {
        throw new CustomAPIError(StatusCodes.UNAUTHORIZED, "User not found");
    }
    //compare passwords and return token if they match otherwise return error
    const match = await bcrypt.compare(password, user.password);
    if(match) {
        const token = user.createJWT();
        return res.status(StatusCodes.OK).json({email:user.email, token});
    }
    throw new CustomAPIError(StatusCodes.UNAUTHORIZED, "Invalid Credentials");
    
}

module.exports = {
    register,
    login
}
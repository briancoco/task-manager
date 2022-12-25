const CustomAPIError = require('../errors/custom-error');
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');

const authUser = (req, res, next) => {
    //grab the token from the req.body
    //use jwt package to verify token
    //if good, add new obj to our req property which contains our token's payload
    //we need this payload inside our tasks controllers so we can perform CRUD operations on the correct user's tasks
    let token = req.headers.authorization;
    if(!token || !token.startsWith('Bearer')) {
        next(new CustomAPIError(StatusCodes.BAD_REQUEST, "Please provide token inside header"));
    }
    token = token.split(' ')[1];
    try {
        payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            userID: payload.userID
        };
        next();
    } catch (error) {
        next(new CustomAPIError(StatusCodes.UNAUTHORIZED, "Please provide a valid token"));
    }
}

module.exports = authUser;
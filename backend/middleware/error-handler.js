const {StatusCodes} = require('http-status-codes');
const CustomAPIError = require('../errors/custom-error');
const errorHandler = (err, req, res, next) => {
    if(err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg: err.message, code: err.statusCode});
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: err.message});
}

module.exports = errorHandler;
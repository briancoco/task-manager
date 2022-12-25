//get Job, get single job, create job, update job, delete job
const Tasks = require('../models/task');
const {StatusCodes} = require('http-status-codes');
const CustomAPIError = require('../errors/custom-error');

const getTasks = async (req, res) => {
    //perform query on our tasks collection and grab all the tasks made by that user associated with the userID
    const {userID} = req.user;
    const tasks = await Tasks.find({createdBy: userID});
    if(!tasks) {
        throw new CustomAPIError(StatusCodes.NOT_FOUND, `No tasks found for userID: ${userID}`);
    }
    res.status(StatusCodes.OK).json({tasks});
    
}

const getTask = async (req, res) => {
    //we need to get our id which is passes as a route param
    //we then want to perform query on our Tasks collection and return back the task associated with the given id
    const {userID} = req.user;
    const {id:postID} = req.params;
    const task = await Tasks.findOne({createdBy: userID, _id: postID});
    if(!task) {
        throw new CustomAPIError(StatusCodes.NOT_FOUND, `No tasks found for userID: ${userID} and postID: ${postID}`);
    }
    res.status(StatusCodes.OK).json({task});
}

const createTask = async (req, res) => {
    //we first want to extract the user id from the request obj
    //we then want to pass in the req.body along with the user id into our document constructor(model)
    //if we get an error from our mongoose validators, then we will redirect to our error handler middleware
    //otherwise, send back a sucessful response and send back the post
    const {userID} = req.user;
    const task = await Tasks.create({...req.body, createdBy: userID});

    res.status(StatusCodes.CREATED).json({task});
}

const updateTask = async (req, res) => {
    //get userId from request object
    //get postId from request object
    //perform query to find and update  specified task document with given info from req.body
    //add option to run validators on our updated values
    const {userID} = req.user;
    const {id:postID} = req.params;
    const task = await Tasks.findOneAndUpdate({createdBy: userID, _id: postID}, req.body, {
        runValidators: true,
        new: true
    });
    if(!task) {
        throw new CustomAPIError(StatusCodes.NOT_FOUND, `No tasks found for userID: ${userID} and postID: ${postID}`);
    }
    res.status(StatusCodes.OK).json({task});
}

const deleteTask = async (req, res) => {
    const {userID} = req.user;
    const {id:postID} = req.params;
    const task = await Tasks.findOneAndRemove({createdBy: userID, _id: postID});
    if(!task) {
        throw new CustomAPIError(StatusCodes.NOT_FOUND, `No tasks found for userID: ${userID} and postID: ${postID}`);
    }
    res.status(StatusCodes.OK).json({task});
}

module.exports = {
    getTask,
    getTasks,
    createTask,
    updateTask,
    deleteTask
}
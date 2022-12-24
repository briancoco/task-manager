//get Job, get single job, create job, update job, delete job

const getTasks = (req, res) => {
    res.status(200).json(req.user);
}

const getTask = (req, res) => {
    res.send('get task')
}

const createTask = (req, res) => {
    res.send('create task')
}

const updateTask = (req, res) => {
    res.send('update task')
}

const deleteTask = (req, res) => {
    res.send('delete task')
}

module.exports = {
    getTask,
    getTasks,
    createTask,
    updateTask,
    deleteTask
}
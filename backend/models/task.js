const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    //task info
    //completed
    //createdBy
    //date(we can get this using mongoose)
    description: {
        type: String,
        required: [true, 'must provide task description'],
        minlength: 1
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: [true, 'must provide user']
    }
}, {timestamps: true})

module.exports = mongoose.model('Tasks', taskSchema);
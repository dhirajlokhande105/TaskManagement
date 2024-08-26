const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
});


const TaskModel = mongoose.model('task', taskSchema);

module.exports = { TaskModel }




const express = require("express")
const { TaskModel } = require("../models/task.model")
const { body, validationResult } = require('express-validator');
const { authenticate } = require("../middleware/auth.middleware");

const taskRouter = express.Router()

// Retrieve all tasks
taskRouter.get('/', authenticate, async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


// Route for creating a new task with validation
taskRouter.post(
    '/',authenticate,
    [
        // Validate the request body fields using express-validator
        body('title').notEmpty().withMessage('Title is required'),
        body('description').notEmpty().withMessage('Description is required'),

    ],
    async (req, res) => {
        try {
            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { title, description } = req.body;

            // Check if a task with the same title already exists
            const existingTask = await TaskModel.findOne({ title });
            if (existingTask) {
                return res.status(400).json({ message: 'Task with the same title already exists' });
            }

            const task = new TaskModel({ title, description });
            const savedTask = await task.save();
            res.status(201).send({ message: "Task created successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Server Error' });
        }
    }
);


// Route for retrieving a specific task by ID
taskRouter.get('/:id',authenticate, async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await TaskModel.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).send({ message: 'Task found successfully',task });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server Error' });
    }
});

// Route for updating a specific task by ID
taskRouter.put('/:id',authenticate, async (req, res) => {
    try {
        const taskId = req.params.id;
        const { title, description, status } = req.body;
         // Check if the provided status is valid
         if (status !== 'pending' && status !== 'completed') {
            return res.status(400).json({ message: 'Invalid status. Status must be either "pending" or "completed"' });
        }

        
        const updatedTask = await TaskModel.findByIdAndUpdate(
            taskId,
            { title, description, status },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).send({ message: 'Task Update successfully',updatedTask});
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server Error' });
    }
});

// Route for deleting a specific task by ID
taskRouter.delete('/:id',authenticate, async (req, res) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await TaskModel.findByIdAndRemove(taskId);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).send({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = { taskRouter }

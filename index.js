// Import required libraries and modules
const express = require("express")

require("dotenv").config()
const { connection } = require("./configs/db")
const { userRouter } = require("./routes/user.routes")
const { taskRouter } = require("./routes/task.routes")
const { authenticate } = require("./middleware/auth.middleware")
const { limiter } = require("./middleware/ratelimiter.middleware")
const cors = require("cors")

// Create an Express application
const app = express()

app.use(express.json())
app.use(cors())

// Middleware for logging API requests
const logRequests = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Continue processing the request
};

// Register the logger middleware to be used for all routes
app.use(logRequests);

// Define a basic route for the root endpoint
app.get("/", async (req, res) => {
    res.send(`<h1 style="text-align: center; color: blue;">Task Management System</h1>`)
    console.log("Welcome to Edulab Assignment")
})

// Use the userRouter for user registration and login
app.use("/user", limiter, userRouter)

// Use the taskRouter for Task management
app.use("/task", limiter, taskRouter)


// Start the server, listen to the specified port
app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("DataBase is connected")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`server is running on port${process.env.port}`)
})
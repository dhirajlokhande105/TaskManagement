# Task Management API

## Project Overview
The Task Management API is a backend RESTful API developed using Node.js, designed to help users manage their tasks efficiently. With this API, users can create, retrieve, update, and delete tasks, making it a valuable tool for task organization and management.

# Key Features

1. **Create Task**
   - **Description:** Users can create new tasks by sending a POST request to the `/task` endpoint. They need to provide a title, description, and status for the task.
   - **Usage Example:** To create a new task, users send a request like this:
     ```http
     POST /task
     Content-Type: application/json

     {
       "title": "Finish Project Report",
       "description": "Write and finalize the project report for presentation.",
       "status": "pending"
     }
     ```
   - **Response:** The API responds with the newly created task, including its unique ID and creation date.

2. **Retrieve Task**
   - **Description:** Users can retrieve a list of all tasks or fetch a specific task by its unique ID. Sending a GET request to `/task` retrieves all tasks, while `/task/:id` retrieves a specific task by ID.
   - **Usage Example:** To retrieve all tasks:
     ```http
     GET /task
     ```
     To retrieve a specific task by ID:
     ```http
     GET /task/:id
     ```
   - **Response:** The API responds with the requested tasks in JSON format.

3. **Update Task**
   - **Description:** Users can modify existing tasks by sending a PUT request to `/task/:id`. They can update the task's title, description, or status.
   - **Usage Example:** To update an existing task:
     ```http
     PUT /task/:id
     Content-Type: application/json

     {
       "title": "Updated Task Title",
       "description": "Updated task description.",
       "status": "completed"
     }
     ```
   - **Response:** The API responds with the updated task, including the changes made.

4. **Delete Tasks**
   - **Description:** Users can remove unwanted tasks from the system by sending a DELETE request to `/task/:id`, where `:id` is the unique ID of the task to be deleted.
   - **Usage Example:** To delete a specific task by ID:
     ```http
     DELETE /task/:id
     ```
   - **Response:** The API responds with a success message indicating that the task has been deleted.

5. **Authentication (Bonus)**
   - **Description:** Users can enhance the security of the API by implementing user registration and login functionality. Endpoints are protected, ensuring that only authenticated users can access them.
   - **Usage Example:** Users need to register and log in to obtain authentication tokens, which they include in the request headers for protected endpoints.

6. **Middleware for Logging**
   - **Description:** The API includes middleware for logging API requests. Each incoming request's method, URL, and timestamp are logged to aid in monitoring and debugging.
   - **Usage:** The logging middleware is automatically applied to all incoming requests.

7. **Error Handling**
   - **Description:** The API gracefully handles errors and returns appropriate HTTP status codes and error messages. It includes custom error handling middleware to ensure that errors are handled consistently.
   - **Usage:** Errors are caught and passed to the error handling middleware, which sends a response with the appropriate status code and error message.

8. **Rate Limiting (Bonus)**
   - **Description:** The API implements rate limiting to restrict clients from making too many requests in a short period. This helps prevent abuse and ensures fair usage of the API.
   - **Usage:** Rate limiting middleware is applied to limit the number of requests clients can make within a specified timeframe.


## Technologies Used
- **Node.js:** The API is built using Node.js, providing a scalable and efficient runtime environment.

- **Express.js:** Express is used for creating the RESTful API endpoints and managing routes.

- **MongoDB:** The choice of a database is MongoDB
  
- **JWT (JSON Web Tokens):**  authentication is implemented, JWT tokens are used to secure the API.

- **Express Validator:** Express-validator is used for input validation and sanitization of user data.

## Setup Instructions
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/task-management-api.git
    ```
2. Install project dependencies:
```bash
npm install
```
4. Start the API server:

```bash
npm run server
```

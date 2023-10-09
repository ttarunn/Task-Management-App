# Task Management App

This is a simple Task Management application that allows users to perform CRUD (Create, Read, Update, Delete) operations on tasks. The project is divided into two main components:

## Backend

The backend of the application is built using Node.js and Express.js, and it provides a RESTful API for managing tasks. Here are the main functionalities of the backend:

- Create, Read, Update, Delete (CRUD) Operations: The API supports CRUD operations for tasks. Each task has attributes like id, title, and description.

- Validation: When creating a task, the API ensures that the task title is not empty. Validation errors are handled gracefully, and appropriate error responses are returned.

- Database: The application uses MongoDB (or MySQL or PostgreSQL) as the database to store task data.

## Frontend

The frontend is built using React and provides a user-friendly interface for managing tasks. Here are the main functionalities of the frontend:

- Task List: Users can view a list of tasks retrieved from the backend API. The list displays task titles.

- CRUD Operations: Users can perform CRUD operations on tasks directly from the UI. They can add new tasks, edit existing tasks, and delete tasks.

- Forms: The application includes forms for adding new tasks and editing existing tasks. Input field validation is implemented to provide feedback for any validation errors.

- API Interaction: Axios is used to interact with the backend API, ensuring seamless communication between the frontend and backend.

- **Infinite Scroll Implementation:**

   This project incorporates the convenient feature of infinite scroll, ensuring a seamless and uninterrupted browsing experience as users explore the content.

**Note:** You can check the infinite scroll feature by logging in using the following details.
   - email: one@one.com
   - password: 12345

# Getting Started

To run the application locally, follow these steps:

- Clone the Repository: Clone this repository to your local machine.

        git clone https://github.com/ttarunn/Task-Management-App

- Backend Setup: Navigate to the backend directory and follow the instructions in the README.md file to set up and run the backend server.

- Frontend Setup: Navigate to the frontend directory and follow the instructions in the README.md file to set up and run the frontend application.


## Accessing the Live Application

To access the Advanced Todo Application, follow these steps:

- First, open the server link by clicking [here](https://adv-todo.onrender.com/). Please note that it may take a few minutes for the server to fetch the data.

- Wait for the server to initialize, and you will see the message: {"message":"Api Working"} on your screen.
Access the Live Application:

Once you see the message confirming that the API is working, you can access the live application by clicking [here](https://adv-todo.netlify.app/).

You will be redirected to the live Advanced Todo Application, where you can start using its features.


# Test Cases with Jest

- This README provides an overview of the test cases written for the Task Management App using the Jest testing framework. Test cases are crucial for ensuring that the application functions correctly and reliably.

## Test Setup

Before running the test cases, ensure that you have Jest installed as a development dependency. You can install it using the following command:

        npm install --save-dev jest

## Running the Tests

You can run the test suite using the following command: 

        npm run test
        
This command will execute all the test cases defined in the __tests__ directory.

## Test Structure

The All test cases are organized into the endpoints.test.js file.

# Technologies Used

- Backend: Node.js, Express.js, MongoDB, Bcrypt, Jwt (jest for testing)
- Frontend: React, Axios

This Task Management App is a great starting point for learning full-stack web development with Node.js, Express.js, React, and a database of your choice. Feel free to customize and expand it to suit your specific project needs.

# Usage

Feel free to explore and utilize the features of the Advanced Todo Application to manage your tasks efficiently.

For any questions, issues, or feedback, please reach out to me at ttarunn0709@gmail.com.

Thank you for using the Advanced Todo Application!

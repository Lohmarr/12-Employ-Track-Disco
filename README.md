# Employee Management System

 This Employee Management System is a command line application that allows users to interact with a MySQL database to manage employees, roles, and departments.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

 To install this application, you first need to clone the repository to your local machine. In your terminal or Git Bash, navigate to the directory where you want to store the application and run the following command:

$ git clone <https://github.com/yourusername/employee-management-system.git>

Next, navigate to the  `employee-management-system`  directory and run the following command to install the required dependencies:

$ npm install

Then, go into the db folder of the repository and run the SQL in both the schema.sql and seeds.sql. You can download MySQL Workbench to run the code, or utilize a VS Code extension.

Finally, create a  `.env`  file in the root directory of the application and add your MySQL connection details as follows:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=employee_db

Make sure to replace  `localhost` ,  `root` ,  `password` , and  `employee_db`  with your own MySQL connection details.

## Usage

 To run the application, navigate to the repository's directory in your terminal or Git Bash and run the following command:

$ node index.js

The application will display a list of options to choose from, including:

- View all departments, roles, or employees
- Add a new department, role, or employee
- Update an employee's role

 Follow the prompts to select the desired action and enter the required information.

Here is a video displaying the application's use:

[Walkthrough Video](https://www.awesomescreenshot.com/video/17537697?key=053524d61d0c9f235e2acf3f6ed6c995)

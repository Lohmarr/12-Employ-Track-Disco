const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
const mainMenu = require('./scripts/prompts')

dotenv.config();

async function start() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  console.log("Connected to MySQL database.");

  const employeeChoices = [];
  const roleChoices = [];

  // Put employees in array
  const employees = await connection.query(
    'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee'
  );
  employees[0].forEach((employee) => {
    employeeChoices.push({
      value: employee.id,
      name: employee.name,
    });
  });

  // Put roles in array
  const roles = await connection.query("SELECT id, title FROM role");
  roles[0].forEach((role) => {
    roleChoices.push({
      value: role.id,
      name: role.title,
    });
  });

  // Call the mainMenu function to start the application
  mainMenu(connection, employeeChoices, roleChoices);
}

start();
const connection = require("../config/connection");

let employeeChoices = [];
let roleChoices = [];
let departmentChoices = [];
let managerChoices = [];

// Define a function to handle errors
const handleErrors = (error) => {
  console.error(`Error executing query: ${error}`);
};

// Put employees in array
(async () => {
  try {
    const [rows] = await connection
      .promise()
      .query(
        "SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee"
      );
    rows.forEach((employee) => {
      employeeChoices.push({
        value: employee.id,
        name: employee.name,
      });
    });
  } catch (error) {
    handleErrors(error);
  }
})();

// Put roles in array
(async () => {
  try {
    const [rows] = await connection
      .promise()
      .query("SELECT id, title FROM role");
    rows.forEach((role) => {
      roleChoices.push({
        value: role.id,
        name: role.title,
      });
    });
  } catch (error) {
    handleErrors(error);
  }
})();

// Put departments in array
(async () => {
  try {
    const [rows] = await connection
      .promise()
      .query("SELECT id, name FROM department");
    rows.forEach((department) => {
      departmentChoices.push({
        value: department.id,
        name: department.name,
      });
    });
  } catch (error) {
    handleErrors(error);
  }
})();

// Put managers in array
(async () => {
  try {
    const [rows] = await connection.promise().query(`
      SELECT 
      DISTINCT e.id, CONCAT(e.first_name, ' ', e.last_name) AS name
      FROM employee e
      WHERE e.manager_id IS NULL
    `);
    rows.forEach((manager) => {
      managerChoices.push({
        value: manager.id,
        name: manager.name,
      });
    });
  } catch (error) {
    handleErrors(error);
  }
})();

module.exports = {
  employeeChoices,
  roleChoices,
  departmentChoices,
  managerChoices,
};

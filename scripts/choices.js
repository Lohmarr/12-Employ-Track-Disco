const connection = require("../config/connection");

const employeeChoices = [];
const roleChoices = [];
const departmentChoices = [];
const managerChoices = [];

// Put employees in array
(async () => {
  const [rows] = await connection.query(
    'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee'
  );
  rows.forEach((employee) => {
    employeeChoices.push({
      value: employee.id,
      name: employee.name,
    });
  });
})();

// Put roles in array
(async () => {
  const [rows] = await connection.query("SELECT id, title FROM role");
  rows.forEach((role) => {
    roleChoices.push({
      value: role.id,
      name: role.title,
    });
  });
})();

// Put departments in array
(async () => {
  const [rows] = await connection.query("SELECT id, name FROM department");
  rows.forEach((department) => {
    departmentChoices.push({
      value: department.id,
      name: department.name,
    });
  });
})();

// Put managers in array
(async () => {
  const [rows] = await connection.query(`
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
})();

module.exports = {
  employeeChoices,
  roleChoices,
  departmentChoices,
  managerChoices,
};

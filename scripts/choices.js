const employeeChoices = [];
const roleChoices = [];
const departmentChoices = [];
const managerChoices = [];

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

// Put departments in array
const departments = await connection.query("SELECT id, name FROM department");
departments[0].forEach((department) => {
  departmentChoices.push({
    value: department.id,
    name: department.name,
  });
});

// Put managers in array
const managers = await connection.query(`
SELECT 
DISTINCT e.id, CONCAT(e.first_name, ' ', e.last_name) AS name
FROM employee e
WHERE e.manager_id IS NULL
`);

managers[0].forEach((manager) => {
  managerChoices.push({
    value: manager.id,
    name: manager.name,
  });
});

module.exports({ employeeChoices, roleChoices, departmentChoices, managerChoices })
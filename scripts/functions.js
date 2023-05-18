const connection = require('../config/connection')
const inquirer = require("inquirer");
const {
  employeeChoices,
  roleChoices,
  departmentChoices,
  managerChoices,
} = require("./choices");

// View Departments
const viewDepartments = async () => {
    const [departments] = await connection.promise().query(`
       SELECT
         department.id AS ID, department.name as Name
       FROM department`);
        console.table(departments);
}

// View Roles
const viewRoles = async () => {
    const [roles] = await connection.promise().query(`
        SELECT 
          role.id AS ID, role.title AS Title, 
          role.salary AS Salary, department.name AS Department 
        FROM role 
        INNER JOIN department ON role.department_id = department.id`);
        console.table(roles);
}

// View Employees
const viewEmployees = async () => {
  const [employees] = await connection.promise().query(`
  SELECT 
    employee.id, employee.first_name, employee.last_name, 
    role.title AS Title, department.name AS Department, role.salary AS Salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS Manager
  FROM employee 
  INNER JOIN role ON employee.role_id = role.id
  INNER JOIN department ON role.department_id = department.id
  LEFT JOIN employee AS manager ON employee.manager_id = manager.id`);
  console.table(employees);
}

// Add Department
const addDepartment = async () => {
  const { departmentName } = await inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the department?",
      name: "departmentName",
    },
  ]);
  await connection.promise().query(
    `INSERT INTO department (name) VALUES ("${departmentName}")`
  );
  console.log(`Department ${departmentName} has been added!`);
}

// Add Role
const addRole = async () => {
  console.log('Department Array:', departmentChoices)
  const { roleTitle, salary, department } = await inquirer.prompt([
    {
      type: "input",
      message: "What is the title of the role?",
      name: "roleTitle",
    },
    {
      type: "input",
      message: "What is the salary for this role?",
      name: "salary",
    },
    {
      type: "list",
      message: "What is the department for this role?",
      name: "department",
      choices: departmentChoices,
    },
  ]);
  const roleQuery = `INSERT INTO roles (title, salary, department_id) VALUES ("${roleTitle}", "${salary}", "${department.value}")`;
  await connection.promise().query(roleQuery);
  console.log(`Role "${roleTitle}" has been added!`);
}

// Add Employee
const addEmployee = async () => {
  const employeeAnswers = await inquirer.prompt([
    {
      type: "input",
      message: "What is the first name of the employee?",
      name: "firstName",
    },
    {
      type: "input",
      message: "What is the last name of the employee?",
      name: "lastName",
    },
    {
      type: "list",
      message: "What is the role for this employee?",
      name: "role",
      choices: roleChoices,
    },
    {
      type: "list",
      message: "Who is the employee's manager?",
      name: "manager",
      choices: managerChoices,
    },
  ]);
  const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${employeeAnswers.firstName}", "${employeeAnswers.lastName}", "${employeeAnswers.role.value}", "${employeeAnswers.manager.value}")`;
  await connection.promise().query(query);
  console.log(
    `Employee ${employeeAnswers.firstName} ${employeeAnswers.lastName} has been added!`
  );
}

// Update Employee
const updateEmployee = async () => {
  const updateAnswers = await inquirer.prompt([
    {
      type: "list",
      message: "Which employee would you like to update?",
      name: "employee",
      choices: employeeChoices,
    },
    {
      type: "list",
      message: "What is the employee's new role?",
      name: "newRole",
      choices: roleChoices,
    },
  ]);
  const updateQuery = `UPDATE employees SET role_id = "${updateAnswers.newRole.value}" WHERE id = "${updateAnswers.employee.value}"`;
  await connection.promise().query(updateQuery);
  console.log(
    `Employee ${updateAnswers.employee} has been updated with a new role!`
  );
}

module.exports = { 
  viewDepartments, 
  viewRoles, 
  viewEmployees,
  addDepartment, 
  addRole, 
  addEmployee, 
  updateEmployee }
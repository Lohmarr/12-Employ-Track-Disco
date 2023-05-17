const inquirer = require("inquirer");
const consoleTable = require("console.table");
const {viewDepartments, viewRoles} = require("./functions");

// Prompt user with options
async function mainMenu(
  connection,
  employeeChoices,
  roleChoices,
  departmentChoices,
  managerChoices
) {
  try {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: [
          { name: "View all departments", value: "view_departments" },
          { name: "View all roles", value: "view_roles" },
          { name: "View all employees", value: "view_employees" },
          { name: "Add a department", value: "add_department" },
          { name: "Add a role", value: "add_role" },
          { name: "Add an employee", value: "add_employee" },
          { name: "Update an employee role", value: "update_employee_role" },
          { name: "Quit", value: "quit" },
        ],
      },
    ]);
    switch (action) {
      case "view_departments":
        viewDepartments();
        break;
      case "view_roles":
        viewRoles();
        break;
      case "view_employees":
        const [employees] = await connection.query(`
        SELECT 
          employee.id, employee.first_name, employee.last_name, 
          role.title AS Title, department.name AS Department, role.salary AS Salary, 
          CONCAT(manager.first_name, ' ', manager.last_name) AS Manager
        FROM employee 
        INNER JOIN role ON employee.role_id = role.id
        INNER JOIN department ON role.department_id = department.id
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id`);
        console.table(employees);
        break;
      case "add_department":
        const { departmentName } = await inquirer.prompt([
          {
            type: "input",
            message: "What is the name of the department?",
            name: "departmentName",
          },
        ]);
        await connection.query(
          `INSERT INTO department (name) VALUES ("${departmentName}")`
        );
        console.log(`Department ${departmentName} has been added!`);
        break;
      case "add_role":
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
        await connection.query(roleQuery);
        console.log(`Role "${roleTitle}" has been added!`);
        break;
      case "add_employee":
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
        await connection.query(query);
        console.log(
          `Employee ${employeeAnswers.firstName} ${employeeAnswers.lastName} has been added!`
        );
        break;
      case "update_employee_role":
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
        await connection.query(updateQuery);
        console.log(
          `Employee ${updateAnswers.employee} has been updated with a new role!`
        );
        break;
      case "quit":
        console.log("Exiting the application...");
        process.exit(0);
        break;
    }
    mainMenu(
      connection,
      employeeChoices,
      roleChoices,
      departmentChoices,
      managerChoices
    );
  } catch (err) {
    console.error(err);
  }
}
module.exports = mainMenu;

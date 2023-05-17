const inquirer = require("inquirer");
const consoleTable = require("console.table");

const {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployee,
} = require("./functions");

// Prompt user with options
async function mainMenu(
  connection,
  employeeChoices,
  roleChoices,
  departmentChoices,
  managerChoices
) {
  inquirer
    .prompt([
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
    ])
    .then(({ action }) => {
      switch (action) {
        case "view_departments":
          viewDepartments();
          break;
        case "view_roles":
          viewRoles();
          break;
        case "view_employees":
          viewEmployees();
          break;
        case "add_department":
          addDepartment();
          break;
        case "add_role":
          addRole();
          break;
        case "add_employee":
          addEmployee();
          break;
        case "update_employee_role":
          updateEmployee();
          break;
        case "quit":
          console.log("Exiting the application...");
          process.exit(0);
          break;
         default: // add default case to handle invalid input
          console.log("Invalid input. Please try again.");
          break; // don't call mainMenu recursively
      }
       // call mainMenu recursively
      mainMenu(
        connection,
        employeeChoices,
        roleChoices,
        departmentChoices,
        managerChoices
      );
    });
}

module.exports = mainMenu;

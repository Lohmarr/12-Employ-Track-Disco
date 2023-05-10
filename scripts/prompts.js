const inquirer = require("inquirer");
const consoleTable = require("console.table");

 // Prompt user with options
async function mainMenu(connection, employeeChoices, roleChoices) {
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
        const departments = await connection.query("SELECT * FROM department");
        consoleTable(departments);
        break;
       case "view_roles":
        const roles = await connection.query("SELECT * FROM role");
        consoleTable(roles);
        break;
       case "view_employees":
        const employees = await connection.query("SELECT * FROM employee");
        consoleTable(employees);
        break;
       case "add_department":
        const { departmentName } = await inquirer.prompt([
          {
            type: "input",
            message: "What is the name of the department?",
            name: "departmentName",
          },
        ]);
         await connection.query(`INSERT INTO department (name) VALUES ("${departmentName}")`);
        console.log(`Department ${departmentName} has been added!`);
        break;
       case "add_role":
        const { roleTitle, salary, departmentId } = await inquirer.prompt([
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
            type: "input",
            message: "What is the department ID for this role?",
            name: "departmentId",
          },
        ]);
         const roleQuery = `INSERT INTO roles (title, salary, department_id) VALUES ("${roleTitle}", "${salary}", "${departmentId}")`;
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
                type: "input",
                message: "What is the role ID for this employee?",
                name: "roleId",
              },
              {
                type: "input",
                message: "What is the ID of the employee's manager?",
                name: "managerId",
              },
            ]);
          const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${employeeAnswers.firstName}", "${employeeAnswers.lastName}", "${employeeAnswers.roleId}", "${employeeAnswers.managerId}")`;
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
                name: "employeeId",
                choices: employeeChoices,
              },
              {
                type: "list",
                message: "What is the employee's new role?",
                name: "newRoleId",
                choices: roleChoices,
              },
            ]);
          const updateQuery = `UPDATE employees SET role_id = "${updateAnswers.newRoleId}" WHERE id = "${updateAnswers.employeeId}"`;
          await connection.query(updateQuery);
          console.log(
            `Employee with ID ${updateAnswers.employeeId} has been updated with a new role!`
          );
          break;
        case "quit":
          console.log("Exiting the application...");
          process.exit(0);
          break;
      }
      mainMenu(connection, employeeChoices, roleChoices);
    } catch (err) { 
      console.error(err);
  }
}
 module.exports = mainMenu;
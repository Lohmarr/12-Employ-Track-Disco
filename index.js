const mainMenu = require("./scripts/prompts");
const connection = require("./config/connection");

// Import choice arrays
const {
  employeeChoices,
  roleChoices,
  departmentChoices,
  managerChoices,
} = require("./scripts/choices");

async function start() {
  // Call the mainMenu function to start the application
  mainMenu(
    connection,
    employeeChoices,
    roleChoices,
    departmentChoices,
    managerChoices
  );
}

start();

const viewDepartments = async () => {
    const [departments] = await connection.query(`
       SELECT
         department.id AS ID, department.name as Name
       FROM department`);
        console.table(departments);
}

const viewRoles = async () => {
    const [roles] = await connection.query(`
        SELECT 
          role.id AS ID, role.title AS Title, 
          role.salary AS Salary, department.name AS Department 
        FROM role 
        INNER JOIN department ON role.department_id = department.id`);
        console.table(roles);
}

module.exports = { viewDepartments, viewRoles }
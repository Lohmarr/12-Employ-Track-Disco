USE cms_db;

INSERT INTO department (name) VALUES 
    ('Sales'),
    ('Marketing'),
    ('Engineering');

INSERT INTO role (title, salary, department_id) VALUES 
    ('Sales Manager', 90000, 1),
    ('Salesperson', 60000, 1),
    ('Marketing Manager', 100000, 2),
    ('Marketing Analyst', 70000, 2),
    ('Software Engineer', 120000, 3),
    ('QA Engineer', 80000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, 1),
    ('Bob', 'Johnson', 3, NULL),
    ('Mary', 'Jones', 4, 3),
    ('Tom', 'Lee', 5, 3),
    ('Tim', 'Chen', 6, 5);
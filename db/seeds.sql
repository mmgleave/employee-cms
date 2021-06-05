-- departments defaults
INSERT INTO departments 
    (title)
VALUES
    ('Production'),
    ('Research and Development'),
    ('Purchasing'),
    ('Marketing'),
    ('Human Resource Management'),
    ('Accounting and Finance'),
    ('Sales');

-- roles defaults
INSERT INTO roles
    (title, salary, department_id)
VALUES
    ('Production Manager', 60000, 1),
    ('R&D Manager', 80000, 2),
    ('Purchasing Manager', 70000, 3),
    ('Marketing Manager', 70000, 4),
    ('HR Manager', 80000, 5),
    ('Accounting Manager', 100000, 6),
    ('Sales Manager', 40000, 7),
    ('Production Assistant', 30000, 1),
    ('R&D Assistant', 40000, 2),
    ('Purchasing Assistant', 35000, 3),
    ('Marketing Assistant', 35000, 4),
    ('HR Assistant', 40000, 5),
    ('Accounting Assistant', 50000, 6),
    ('Sales Assistant', 20000, 7);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, 1),
    ('Jane', 'Doe', 2, 2);
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'company'
  },
  console.log('Connected to the company database.')
);

// **DEPARTMENTS**

// add dept inq prompt
const addDepartmentPrompt = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'addDepartment',
      message: 'Department Name: ',
      validate: departmentInput => {
        if (departmentInput) {
          return true;
        } else {
          console.log('Please enter a department name.');
          return false;
        }
      }
    }
  ])
};

// add dept mysql
const addDepartmentMySql = (title) => {
  const sql = `INSERT INTO departments (title) VALUES (?)`;
  const params = (title);

  db.query(sql, params);
};

// add dept func
const addDepartment = () => {
  addDepartmentPrompt()
    .then((departmentPromptAnswer) => {
      console.log('Added Department: ' + departmentPromptAnswer.addDepartment)
      addDepartmentMySql(departmentPromptAnswer.addDepartment);
      startApp();
    });
};

// view all dept func
const viewAllDepartments = () => {
  const sql = `SELECT id, title AS department FROM departments`

  db.query(sql, (err, rows) => {
    if (err) {
      throw (err)
    } else {
      const table = consoleTable.getTable(rows)
      console.log(table);
      startApp();
    }
  })
};

// **ROLES** (all dependent on departments table)

// add a new role (async)
const addRole = async () => {
  const getDepartments = await db.promise().query(`SELECT * FROM departments`)
  let departmentList = getDepartments[0].map((titles) => {
    return {
      name: titles.title,
      value: titles.id
    }
  })
  const addRolePrompt = await inquirer.prompt([
    {
      type: 'input',
      name: 'roleTitle',
      message: 'Role Title: ',
      validate: roleTitleInput => {
        if (roleTitleInput) {
          return true;
        } else {
          console.log('Please enter a role title.');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'roleSalary',
      message: 'Role Salary: ',
      validate: roleSalaryInput => {
        if (roleSalaryInput) {
          return true;
        } else {
          console.log('Please enter a role salary.');
          return false;
        }
      }
    },
    {
      type: 'list',
      name: 'roleDepartment',
      message: 'Department: ',
      choices: departmentList
    }
  ])
  .then(addRoleAnswers => {
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
    const params = [addRoleAnswers.roleTitle, addRoleAnswers.roleSalary, addRoleAnswers.roleDepartment]

    db.query(sql, params);
    console.log('Added Role: ' + addRoleAnswers.roleTitle)
    startApp();
  })
};


// view all roles func
const viewAllRoles = () => {
  const sql = `SELECT 
    roles.id, 
    roles.title, 
    roles.salary, 
    departments.title AS department 
    
    FROM roles
    
    LEFT JOIN departments ON departments.id = roles.department_id
    `

  db.query(sql, (err, rows) => {
    if (err) {
      throw (err)
    } else {
      const table = consoleTable.getTable(rows)
      console.log(table);
      startApp();
    }
  })
};

// **EMPLOYEES** (all dependent on departments table and roles table)

// add a new employee (async)
const addEmployee = async () => {
  const getEmployees = await db.promise().query(`SELECT * FROM employees`)
  let employeeList = getEmployees[0].map((employeeNames) => {
    return {
      name: employeeNames.first_name.concat(" ", employeeNames.last_name),
      value: employeeNames.id
    }
  })

  const getRoles = await db.promise().query(`SELECT * FROM roles`)
  let roleList = getRoles[0].map((titles) => {
    return {
      name: titles.title,
      value: titles.id
    }
  })
  
  const addEmployeePrompt = await inquirer.prompt([
    {
      type: 'input',
      name: 'employeeFirstName',
      message: 'Employee First Name: ',
      validate: employeeFirstNameInput => {
        if (employeeFirstNameInput) {
          return true;
        } else {
          console.log('Please enter the employee\'s first name.');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'employeeLastName',
      message: 'Employee Last Name: ',
      validate: employeeLastNameInput => {
        if (employeeLastNameInput) {
          return true;
        } else {
          console.log('Please enter the employee\'s last name.');
          return false;
        }
      }
    },
    {
      type: 'list',
      name: 'employeeRole',
      message: 'Employee Role: ',
      choices: roleList
    },
    {
      type: 'list',
      name: 'employeeManager',
      message: 'Employee Manager: ',
      choices: employeeList
    }
  ])

  .then(addEmployeeAnswers => {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    const params = [addEmployeeAnswers.employeeFirstName, addEmployeeAnswers.employeeLastName, addEmployeeAnswers.employeeRole, addEmployeeAnswers.employeeManager]

    db.query(sql, params);
    console.log('Added Employee: ' + addEmployeeAnswers.employeeFirstName + ' ' + addEmployeeAnswers.employeeLastName)
    startApp();
  })
};

// view all employees func
const viewAllEmployees = () => {
  const sql = `SELECT 
    employees.id, 
    employees.first_name,
    employees.last_name,
    roles.title AS role_title, 
    departments.title AS department,
    roles.salary,
    CONCAT(employees.first_name, ' ', employees.last_name) AS manager 

    FROM employees

    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON departments.id = roles.department_id
    `

  db.query(sql, (err, rows) => {
    if (err) {
      throw (err)
    } else {
      const table = consoleTable.getTable(rows)
      console.log(table);
      startApp();
    }
  })
};

// **UPDATE ROLE** (all dependent on departments table, employees table, and roles table)

const updateRole = async () => {
  const getEmployees = await db.promise().query(`SELECT * FROM employees`)
  let employeeList = getEmployees[0].map((employeeNames) => {
    return {
      name: employeeNames.first_name.concat(" ", employeeNames.last_name),
      value: employeeNames.id
    }
  })

  const getRoles = await db.promise().query(`SELECT * FROM roles`)
  let roleList = getRoles[0].map((titles) => {
    return {
      name: titles.title,
      value: titles.id
    }
  })

  const updateRolePrompt = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeToUpdate',
      message: 'Choose the employee you want to update: ',
      choices: employeeList
    },
    {
      type: 'list',
      name: 'newRole',
      message: 'Choose the employee\'s new role: ',
      choices: roleList
    }
  ])

  .then(updateEmployeeAnswers => {
    const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
    const params = [updateEmployeeAnswers.employeeToUpdate, updateEmployeeAnswers.newRole]

    db.query(sql, params);
    console.log('Updated Employee to new role.')
    startApp();
  })
}

// **INITIAL PROMPTS**

// step one: initial prompt for user's choice for activity
const initPrompt = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'init',
      message: "What would you like to do?",
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role'
      ]
    }
  ])
};

// step two: (dependent on user's choice for activity from initPrompt)
const userChoice = (choice) => {
  switch (choice.init) {
    case 'View all departments':
      viewAllDepartments();
      break;
    case 'View all roles':
      viewAllRoles();
      break;
    case 'View all employees':
      viewAllEmployees();
      break;
    case 'Add a department':
      addDepartment();
      break;
    case 'Add a role':
      addRole();
      break;
    case 'Add an employee':
      addEmployee();
      break;
    case 'Update an employee role':
      updateRole();
      break;
  }
};

const startApp = () => {
  initPrompt()
    .then((choice) => {
      userChoice(choice);
    })
};

startApp();
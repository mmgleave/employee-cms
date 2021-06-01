const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'kd6-3.7joe',
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
                if(departmentInput){
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
const addDepartmentMySql = (name) => {
  const sql = `INSERT INTO departments (name) VALUES (?)`;
  const params = (name);

  db.query(sql, params);
};

// add dept func
const addDepartment = () => {
  addDepartmentPrompt()
    .then((departmentPromptAnswer) => {
      console.log(departmentPromptAnswer.addDepartment)
      addDepartmentMySql(departmentPromptAnswer.addDepartment);
    })
};

// view all dept func
const viewAllDepartments = () => {
  const sql = `SELECT id, name AS department_name FROM departments`

  db.query(sql, (err, rows) => {
    if(err) {
      throw(err)
    } else {
      const table = consoleTable.getTable(rows)
      console.log(table);
    }
  })
};

// **ROLES** (all dependent on departments table)

// add role inq prompt
const addRolePrompt = () => {
  return inquirer.prompt([
      {
          type: 'input',
          name: 'roleName',
          message: 'Role Name: ',
          validate: roleNameInput => {
              if(roleNameInput){
                  return true;
              } else {
                  console.log('Please enter a role name.');
                  return false;
              }
          }
      },
      {
          type: 'input',
          name: 'roleSalary',
          message: 'Role Salary: ',
          validate: roleSalaryInput => {
              if(roleSalaryInput){
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
          message: 'Role Department: ',
          choices: [
              // array of names of existing departments?
          ]
      }
  ])
};

// add role mysql
const addRoleMySql = (roleInfo) => {
  const sql = `INSERT INTO roles (name, salary, department_id) VALUES (?, ?, ?)`;
  const params = (roleInfo.roleNameInput, roleInfo.roleSalaryInput, roleInfo.roleDepartment);

  db.query(sql, params);
};

// add role func
const addRole = () => {
  addRolePrompt()
    .then((rolePromptAnswers) => {
      addRoleMySql(rolePromptAnswers)
    })
};

// view all roles func
const viewAllRoles = () => {
  const sql = `
    SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles
    LEFT JOIN departments ON departments.id = roles.department_id
    `

  db.query(sql, (err, rows) => {
    if(err) {
      throw(err)
    } else {
      const table = consoleTable.getTable(rows)
      console.log(table);
    }
  })
};

// **EMPLOYEES** (all dependent on departments table and roles table)

// add employee inq prompt
const addEmployeePrompt = () => {
  return inquirer.prompt([
      {
          type: 'input',
          name: 'employeeFirstName',
          message: 'Employee First Name: ',
          validate: employeeFirstNameInput => {
              if(employeeFirstNameInput){
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
              if(employeeLastNameInput){
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
          choices: [
              // array of names of existing roles?
          ]
      },
      {
          type: 'list',
          name: 'employeeManager',
          message: 'Employee Manager: ',
          choices: [
              // array of names of existing employees and also a choice for none?
          ]
      }
  ])
};

// add employee mysql
const addEmployeeMySql = (employeeInfo) => {
  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
  const params = (employeeInfo.employeeFirstNameInput, employeeInfo.employeeLastNameInput, employeeInfo.employeeRole, employeeInfo.employeeManager);

  db.query(sql, params);
};

// add employee func
const addEmployee = () => {
  addEmployeePrompt()
    .then((addEmployeePromptAnswers) => {
      addEmployeeMySql(addEmployeePromptAnswers)
    })
};

// view all employees func
const viewAllEmployees = () => {
  const sql = `SELECT first_name, last_name, role_id, manager_id FROM employees`;

  db.query(sql, (err, rows) => {
    if(err) {
      throw(err)
    } else {
      const table = consoleTable.getTable(rows)
      console.log(table);
    }
  })
};

// **UPDATE ROLE** (all dependent on departments table, employees table, and roles table)

// inq prompt to update role
const updateRolePrompt = () => {
  return inquirer.prompt([
      {
          type: 'list',
          name: 'employeeToUpdate',
          message: 'Choose the employee you want to update: ',
          choices: [
              // array of names of existing employees
          ]
      },
      {
          type: 'list',
          name: 'newRole',
          message: 'Choose the employee\'s new role: ',
          choices: [
              // array of names of existing roles
          ]
      }
  ])
};

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
  switch(choice.init){
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

initPrompt()
  .then((choice) => {
    userChoice(choice);
  })
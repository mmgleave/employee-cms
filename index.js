const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

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

  // prompt for adding a department
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

// prompt for adding a role (dependent on department)
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

// prompt for adding an employee (dependent on department and role)
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

// prompt to update role (dependent on employee and role)
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

// function for adding a department
const addDepartment = () => {
  addDepartmentPrompt()
    .then((departmentPromptAnswer) => {
      console.log(departmentPromptAnswer)
    })
};

// function for adding a role (dependent on department)
const addRole = () => {
  addRolePrompt()
    .then((rolePromptAnswers) => {
      console.log(rolePromptAnswers)
    })
};

// function for adding an employee (dependent on department and role)
const addEmployee = () => {
  addEmployeePrompt()
    .then((employeePromptAnswers) => {
      console.log(employeePromptAnswers)
    })
};

  // initial prompt for user's choice for activity
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


// next step depending on user choice for activity
const userChoice = (choice) => {
  switch(choice.init){
    case 'View all departments':
      console.log('User selected: ' + 1);
    case 'View all roles':
      console.log('User selected: ' + 2);
    case 'View all employees':
      console.log('User selected: ' + 3);
    case 'Add a department':
      addDepartment();
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
}

initPrompt()
  .then((choice) => {
    userChoice(choice);
  })
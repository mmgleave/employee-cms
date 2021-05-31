const inquirer = require('inquirer');

// initial prompt for user's choice for activity
const initPrompt = () => {
    inquirer.prompt([
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

// view all departments choice returns console.table with mysql request for departments table
// view all roles choice returns console.table with mysql request for roles table
// view all employees choice returns console.table with mysql request for employees table

// add a department choice returns prompt for department name and adds to database

// prompt for adding a department
const addDepartment = () => {
    inquirer.prompt([
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


// add a role choice returns prompt for role name, salary, and department and role is added to database

// prompt for adding a role
const addRole = () => {
    inquirer.prompt([
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
}

// add an employee choice returns prompt for first name, last name, role, and manager and employee is added to database

// prompt for adding an employee
const addEmployee = () => {
    inquirer.prompt([
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
}

// update an employee role choice returns prompt to choose employee and select their new role and update the information in the database
const updateEmployeeRole = () => {
    inquirer.prompt([
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
}
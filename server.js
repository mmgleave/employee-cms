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
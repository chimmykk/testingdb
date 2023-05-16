const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));

// Create connection object
const connection = mysql.createConnection({
  host: 'sql12.freemysqlhosting.net',
  user: 'sql12618543',
  password: '4gkXLtHReM',
  database: 'sql12618543'
});

// Connect to MySQL server
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error);
    return;
  }
  
  console.log('Connected to database!');
});

// Route to handle form submission
app.post('/submit-form', (req, res) => {
  const { name, rrn, email, phonenumber } = req.body;
  
  // Insert form data into MySQL table
  const sql = `INSERT INTO users (name, rrn, email, phone_number) VALUES ('${name}', '${rrn}', '${email}', '${phonenumber}')`;
  
  connection.query(sql, (error, results) => {
    if (error) throw error;
    console.log(`Form data inserted successfully!`);
    res.send('Form submitted successfully!');
  });
});

// Close connection when server stops
app.on('close', () => {
  connection.end();
});

// Start server on port 3000
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
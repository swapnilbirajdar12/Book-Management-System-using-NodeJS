const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Swapnil@4592',
  database: 'book_management_db',
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', + err.stack);
  } else {
    console.log('Connected to MySQL database');
  }
});

module.exports = db;

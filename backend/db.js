const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // 👈 your MySQL username
  password: '',       // 👈 your MySQL password
  database: 'linkedin_clone'
});

connection.connect(err => {
  if (err) throw err;
  console.log('✅ MySQL Connected...');
});

module.exports = connection;

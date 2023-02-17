const mysql = require("mysql2");
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'megacred' 
});

connection.query('SELECT * FROM users', function(err, rows, fields)
{
  if (err) throw err;
  console.log('The solution is: ', rows[0]);
});

connection.end();
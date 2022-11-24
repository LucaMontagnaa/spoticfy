const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'spoticfy',
  password: 'rootroot'
});

conn.connect(function (err) {
  if (err) throw err;
  console.log("Conectado!");
});

module.exports = conn;

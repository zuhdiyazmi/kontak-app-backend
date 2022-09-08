const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "db_kontak",
});

module.exports = connection;

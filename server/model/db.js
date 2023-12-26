const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12672420",
  password: "IKWljPLCzB",
  port: "3306",
  database: "sql12672420",
});

module.exports = connection;

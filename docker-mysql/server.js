var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "alpruser",
  password: "=[-p0o9i8U",
  database: "alprdata"

});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM items", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "alpruser",
  password: "=[-p0o9i8U",
  database: "alprdata"

});





  export default function handler(req, res) {
    con.query("SELECT * FROM items", function (err, result, fields) {
         if (err) throw err;
         //res.json({ result })
         res.status(200).json(result)

      });
  //res.status(200).json({ name: 'John Doe' })
}
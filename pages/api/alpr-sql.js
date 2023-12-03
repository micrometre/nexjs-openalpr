var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "alpruser",
  password: "=[-p0o9i8U",
  database: "alprdata"

});

  export default function handler(req, res) {
    con.query(`SELECT * FROM images_plates`, function (err, result, fields) {
         if (err) throw err;
         res.status(200).json(result)

      });
}
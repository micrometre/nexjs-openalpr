var mysql = require('mysql');
import { watch } from 'fs';

var con = mysql.createConnection({
  host: "localhost",
  user: "alpruser",
  password: "=[-p0o9i8U",
  database: "alprdata"

});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const newUuid = req.body.uuid;
    const newPlates = req.body.results[0].plate;
    watch('./public/images', (eventType, filename) => {
    const sqlValues = [filename, newUuid]
    //var sql = "INSERT INTO items (id, plate, uuid) VALUES ('1111111', 'Highway 37', 'testing')";
    let sql = `INSERT INTO items(plate, uuid) VALUES(?, ?)`;
      console.log(filename)
    con.query(sql, sqlValues, function (err, result) {
      if (err) throw err;
      console.error();
      //res.json({ result })
    });
    });
    res.status(200).json(newPlates)
  }
  if (req.method === 'GET') {
    res.status(200).json({ text: 'Hello' });

  }
}
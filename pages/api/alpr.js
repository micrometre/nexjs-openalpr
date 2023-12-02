var mysql = require('mysql');
import { watch } from 'fs';

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "alpruser",
  password: "=[-p0o9i8U",
  database: "alprdata"

});


con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  var sqlimages = `CREATE TABLE IF NOT EXISTS alpr_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    img TEXT,
    created_on DATETIME NOT NULL DEFAULT NOW() -- or CURRENT_TIMESTAMP
  )`
  var sqlplates = `CREATE TABLE IF NOT EXISTS alpr_plates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    plate TEXT,
    uuid TEXT,
    created_on DATETIME NOT NULL DEFAULT NOW() -- or CURRENT_TIMESTAMP
  )`
  con.query(sqlimages, function (err, result) {
    if (err) throw err;
    console.log("Images Tables  created");
  });
  con.query(sqlplates, function (err, result) {
    if (err) throw err;
    console.log("Plates Tables created");
  });
});


watch('./public/images', (eventType, filename) => {
  const sqlValues = ["http://localhost:3000/images/" + filename]
  let sql = `INSERT INTO alpr_images(img) VALUES(?)`;
  console.log(sqlValues)
  con.query(sql, sqlValues, function (err, result) {
    if (err) throw err;
    console.error();
  });
});



export default async function handler(req, res) {
  if (req.method === 'POST') {
    const newUuid = req.body.uuid;
    const newPlates = req.body.results[0].plate;
    const sqlValues = [newPlates, newUuid]
    let sql = `INSERT INTO alpr_plates(plate, uuid) VALUES(?, ?)`;
    console.log(sqlValues)
    con.query(sql, sqlValues, function (err, result) {
      if (err) throw err;
      console.error();
      //res.json({ result })
    });
    res.status(200).json(newPlates)
  }
  if (req.method === 'GET') {
    res.status(200).json({ text: 'Hello' });

  }
}
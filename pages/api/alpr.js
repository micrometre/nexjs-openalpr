import { watch } from 'fs';
import EventEmitter from "events";
const stream = new EventEmitter();
export const delay = (ms) => new Promise(function (resolve) {
  return setTimeout(resolve, ms);
});
var mysql = require('mysql');
let plates = [];
let plates_id = []
var con = mysql.createConnection({
  host: "localhost",
  user: "alpruser",
  password: "=[-p0o9i8U",
  database: "alprdata"

});


con.connect(function (err) {
  if (err) throw err;
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
  });
  con.query(sqlplates, function (err, result) {
    if (err) throw err;
  });
});


watch('./public/images', (eventType, filename) => {
  const sqlValues = ["http://localhost:3000/images/" + filename]
  let sql = `INSERT INTO alpr_images(img) VALUES(?)`;
  con.query(sql, sqlValues, function (err, result) {
    if (err) throw err;
    console.error();
  });
});


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const newUuid = req.body.uuid;
    const newPlates = req.body.results[0].plate;
    plates_id.push(newUuid)
    plates.push(newPlates);
    const sqlValues = [newPlates, newUuid]
    let sql = `INSERT INTO alpr_plates(plate, uuid) VALUES(?, ?)`;
    con.query(sql, sqlValues, function (err, result) {
      if (err) throw err;
      console.error();
    });
    res.status(200).json(newPlates)
  }

  if (req.method === 'GET') {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Connection", "keep-alive");
    let counter = 0;
    stream.on("channel", function (event, data) {
      res.write(`event: ${event}\ndata: ${JSON.stringify({ data })}\n\n`); // <- the format here is important!
    });
    for (let x in plates, plates_id) {
      const data = `${plates[x]}, ${plates_id[x]}`;
      stream.emit("channel", "alprEvent", data); // the event name here must be the same as in the EventSource in frontend
      await delay(100);
    }

    res.end('done\n');

  }
  else {
    // Handle any other HTTP method
  }
}
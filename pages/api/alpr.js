import { watch } from 'fs';
import EventEmitter from "events"
import chokidar from "chokidar"



const watcher = chokidar.watch('.', {
  persistent: true,
  cwd: "public/images",
  ignoreInitial: true,
  ignorePermissionErrors: false,
  interval: 900,
  binaryInterval: 300,
  disableGlobbing: false,
  enableBinaryInterval: true,
  useFsEvents: false,
  usePolling: false,
  atomic: true,
  followSymlinks: true,
  awaitWriteFinish: false
})



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
  var sql_images = `CREATE TABLE IF NOT EXISTS alpr_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    img TEXT,
    created_on DATETIME NOT NULL DEFAULT NOW() -- or CURRENT_TIMESTAMP
  )`
  var sql_plates = `CREATE TABLE IF NOT EXISTS alpr_plates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    plate TEXT,
    uuid TEXT,
    created_on DATETIME NOT NULL DEFAULT NOW() -- or CURRENT_TIMESTAMP
  )`
  var images_plates = `CREATE TABLE IF NOT EXISTS images_plates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    plate TEXT,
    uuid TEXT,
    img TEXT,
    created_on DATETIME NOT NULL DEFAULT NOW() -- or CURRENT_TIMESTAMP
  )`
  con.query(sql_images, function (err, result) {
    if (err) throw err;
  });
  con.query(sql_plates, function (err, result) {
    if (err) throw err;
  });
  con.query(images_plates, function (err, result) {
    if (err) throw err;
  });
});





export default async function handler(req, res) {
  if (req.method === 'POST') {
    watcher.on('add', path => {
      const newUuid = req.body.uuid;
      const newPlates = req.body.results[0].plate;
      plates_id.push(newUuid)
      plates.push(newPlates);
      const sqlValues = [newPlates, newUuid, "http://localhost:3000/images/" + path]
      console.log(sqlValues)
      let sql = `INSERT INTO images_plates(plate, uuid, img) VALUES(?, ?, ?)`;
      con.query(sql, sqlValues, function (err, result) {
        if (err) throw err;
        console.error();
      });

    res.status(200).json(newPlates)
    })

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
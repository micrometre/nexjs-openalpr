import { watch } from 'fs';
import EventEmitter from "events";

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "alpruser",
  password: "=[-p0o9i8U",
  database: "alprdata"

});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  //var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
  var sql =  `CREATE TABLE IF NOT EXISTS alpr_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    img TEXT,
    created_on DATETIME NOT NULL DEFAULT NOW() -- or CURRENT_TIMESTAMP
  )`
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});


const datetime = new Date();

watch('./public/images', (eventType, filename) => {
  const sqlValues = [ "http://localhost:3000/images/" + filename]
  let sql = `INSERT INTO alpr_images(img) VALUES(?)`;
    console.log(sqlValues)
  con.query(sql, sqlValues, function (err, result) {
    if (err) throw err;
    console.error();
    //res.json({ result })
  });
  });


export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const stream = new EventEmitter();
export default async function handler(req, res) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  let counter = 0;
  stream.on("channel", function (event, data) {
    res.write(`event: ${event}\ndata: ${JSON.stringify({ data })}\n\n`);
  });

  watch('./public/images', (eventType, filename) => {
    stream.emit("channel", "alprImageEvent", "http://localhost:3000/images/" + filename);
    return filename
  });
  counter++;
  await delay(100000);
  res.end("done\n");
}

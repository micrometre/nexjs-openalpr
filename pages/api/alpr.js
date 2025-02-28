import EventEmitter from "events"
import { con } from "./con";


const stream = new EventEmitter();
export const delay = (ms) => new Promise(function (resolve) {
  return setTimeout(resolve, ms);
});


con.connect(function (err) {
  if (err) throw err;
  var images_plates = `CREATE TABLE IF NOT EXISTS images_plates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    plate TEXT,
    img TEXT,
    created_on DATETIME NOT NULL DEFAULT NOW() -- or CURRENT_TIMESTAMP
  )`
  con.query(images_plates, function (err, result) {
    if (err) throw err;
  });
});

const mysql = require('mysql2/promise');

async function insertData(data) {
  const pool = mysql.createPool({
    user: "alpruser",
    password: "=[-p0o9i8U",
    database: "alprdata"
  });

  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.execute(
      'INSERT INTO images_plates (plate, img) VALUES (?, ?)',
      [data.column1, data.column2]
    );
    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    pool.end();
  }
}

const myData = {
  column1: 'value1',
  column2: 123,
};




export default async function handler(req, res) {
  if (req.method === 'POST') {
    const newPlates = req.body.results[0].plate;
    const sqlValues = [newPlates, "http://localhost:3000/images/"]
    insertData(myData);
    console.log(sqlValues)
    res.status(200).json(newPlates)
  }
}
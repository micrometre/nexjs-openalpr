import EventEmitter from "events";
import { watch } from 'fs';
const { execFile } = require('node:child_process');


let plates = [];
let plates_id = []
const sqlite3 = require("sqlite3").verbose();
export const delay = (ms) => new Promise(function (resolve) {
  return setTimeout(resolve, ms);
});
const stream = new EventEmitter();
//EventEmitter.defaultMaxListeners = 19;
const deleteFile = 'sqlite-data/collection.db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    watch('./public/upload/alprVideo.mp4', (eventType, filename) => {
      const child = execFile('./manage.sh', (error, stdout, stderr) => {
        if (error) {
          throw error;
        }
        console.log(stdout);
      });
    });




    const newUuid = req.body.uuid;
    const newPlates = req.body.results[0].plate;
    plates_id.push(newUuid)
    plates.push(newPlates);
    console.log(plates.length)
    console.log(plates_id.length)

    const db = new sqlite3.Database(
      "sqlite-data/collection.db",
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) {
          return console.error(err.message);
        }
      }
    );
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY,
            plate TEXT,
            uuid TEXT
          )`,
        (err) => {
          if (err) {
            return console.error(err.message);
          }
          const sqlValues = [newPlates, newUuid]
          // console.log(sqlValues)
          const insertSql = `INSERT INTO items(plate, uuid) VALUES(?, ? )`;
          db.run(insertSql, sqlValues, function (err) {
            if (err) {
              return console.error(err.message);
            }
            const id = this.lastID; // get the id of the last inserted row
          });
        }
      );
    });
    return res.json(newPlates)
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
      await delay(300);
    }

    res.end('done\n');

  }
  else {
    // Handle any other HTTP method
  }
}
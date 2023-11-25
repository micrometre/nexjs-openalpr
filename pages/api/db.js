import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db = null;

export default async function FetchAllAlpr(req, res) {
  if (req.method === 'GET') {
    if (!db) {
      db = await open({
        filename: "sqlite-data/collection.db", 
        driver: sqlite3.Database, 
      });
    }
    //SELECT * FROM "items" WHERE LENGTH(plate) = 7;
    const items = await db.all(`

    SELECT * FROM items;
    
    `);
    res.status(200).json(items)
  }
}
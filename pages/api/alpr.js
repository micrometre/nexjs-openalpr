var mysql = require('mysql');
import { watch } from 'fs';



export default async function handler(req, res) {
  if (req.method === 'POST') {
    const newUuid = req.body.uuid;
    const newPlates = req.body.results[0].plate;
    //console.log(newPlates)
    res.status(200).json(newPlates)
  }
  if (req.method === 'GET') {
    res.status(200).json({ text: 'Hello' });

  }
}
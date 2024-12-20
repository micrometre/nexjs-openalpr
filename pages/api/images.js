import { watch } from 'fs';
import EventEmitter from "events";


export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const stream = new EventEmitter();
export default async function handler(req, res) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
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

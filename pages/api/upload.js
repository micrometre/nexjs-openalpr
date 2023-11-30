import formidable from "formidable";
import fs from "fs";
import { watch } from 'fs';

export const config = {
  api: {
    bodyParser: false
  }
};
const deleteFile = './docs/deleteme.txt'


export default async function post(req, res) {
  if (req.method === 'POST') {
    watch('./public/upload', (eventType, filename) => {
      if (fs.existsSync(deleteFile)) {
        fs.unlink(deleteFile, (err) => {
            if (err) {
                console.log(err);
            }
            console.log('deleted');
        })
    }
    });
    const form = formidable({
      defaultInvalidName: 'invalid',
      uploadDir: `public/upload`,
      keepExtensions: true,
      createDirsFromUploads: false,
      allowEmptyFiles: true,
      minFileSize: 0
    });
    let fields;
    let files;
    try {
      [fields, files] = await form.parse(req);
    } catch (err) {
      if (err.code === formidableErrors.maxFieldsExceeded) {
      }
      console.error(err);
      res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
      res.end(String(err));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ fields, files }, null, 2));

    const saveFile = async (file) => {
      const data = fs.readFileSync(files.file[0].filepath);
      fs.writeFileSync(`./public/upload/alprVideo.mp4`, data);
      //fs.writeFileSync(`./public/upload/${files.file[0].originalFilename}`, data);
      await fs.unlinkSync(files.file[0].filepath);
      return;
    };

    await saveFile(files.file);

    return;

  }
}
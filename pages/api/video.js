import fs from 'fs'
import path from 'path'

const filePath = path.resolve('.', 'public/upload/alprVideo.mp4')
const imageBuffer = fs.readFileSync(filePath)

export default function(req, res) {
  res.setHeader('Content-Type', 'video/mp4')
  res.send(imageBuffer)
}


export const config = {
  api: {
    responseLimit: false,
  },
}
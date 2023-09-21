const multer = require('multer') 
const path = require('path')
const destination = path.resolve('temp')
const multerConfig = multer.diskStorage({
    destination,
    filename: (req, file, cb)=>{
      cb(null, file.originalname);
}
})
const limits = {
    fileSize: 1024 * 1024 * 5 
}

const upload = multer({
    storage: multerConfig,
    limits, 
})

module.exports = upload

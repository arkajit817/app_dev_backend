const express = require('express')
const router = express.Router();

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile, getFileStream } = require('./s3')



router.route("/").post(upload.single('image'),async(req, res) => {
    const file = req.file
    console.log(file)
  
    // apply filter
    // resize 
    let uploadfiletype = req.body.type ;
    const result = await uploadFile(file, uploadfiletype)
    await unlinkFile(file.path)
    console.log(result)
    const description = req.body.description
    res.send({imagePath: `/images/${result.Key}`})
});


module.exports = router;

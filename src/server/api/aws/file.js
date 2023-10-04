// const express = require('express');
// const router = express.Router();

// const aws = require('aws-sdk');
// const multer = require('multer');
// const multerS3 = require('multer-s3');

// aws.config.update({
//     accessKeyId: 'AKIA4PDKKBXAI62QF7UQ',
//     secretAccessKey: 'n/cMbpfW2Bufcsz3q8/vuT75YncRjy+wRJclRNSU',
//     region: 'Asia Pacific (Mumbai) ap-south-1', // Change to your desired AWS region
//   });

// const Quotation = require('../models/quotation');
// const S3 = require('./s3.service');
// const aws = require('../../config/aws');
// const fileparser = require('./fileparser');
// const uploadFile = require('./upload');

// const AWS = require('aws-sdk');
// const S3 = require('aws-sdk/clients/s3')
// const Busboy = require('busboy');

// AWS.config.update({ accessKeyId: aws.medicine.IAM_USER_KEY, secretAccessKey: aws.medicine.IAM_USER_SECRET });
// const S3 = new AWS.S3();

// router.post('/upload', function (req, res) {
// router.route("/").post( (req, res) => {
//     // console.log("inside", req)
//     let bucketName = aws.medicine.BUCKET_NAME;
//     if (req.query.type == 'medicinedocs') {
//         bucketName = aws.medicine.BUCKET_NAME;
//     }
//     // if (req.query.type == 'attachment') {
//     //     bucketName = aws.attachment.BUCKET_NAME;
//     // }
//     // if(req.query.type == 'images'){
//     //     bucketName = aws.quotation_images.BUCKET_NAME;

//     // }
//     return S3.uploadToS3(req, bucketName)
//         .then((file_location) => {
//             console.log(file_location);
//             if (req.query.type == 'medicinedocs' || req.query.type == 'images') {
//                 res.status(200).json(file_location);
//                 return;
//             }
//             res.send(file_location);
//             return file_location;
//         })
//         .catch((err) => { res.status(500).send(err) });
// });


// router.route("/").post( (req, res) => {
//     console.log("inside", req)
//     let chunks = [], fname, ftype, fEncoding;
//     let busboy =  Busboy({ headers: req.headers });
//     busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
//         console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
//         fname = filename.replace(/ /g,"_");
//         ftype = mimetype;
//         fEncoding = encoding;
//         file.on('data', function(data) {
//             // you will get chunks here will pull all chunk to an array and later concat it.
//             console.log (chunks.length);
//             chunks.push(data)
//         });
//         file.on('end', function() {
//             console.log('File [' + filename + '] Finished');
//         });
//         file.on('error', function(err) {
//             // do whatever you want with your error
//             file.unpipe();

//           })
//     });
//     busboy.on('finish', function() {
//         // const userId = UUID();
//         const params = {
//             Bucket: aws.medicine.BUCKET_NAME, // your s3 bucket name
//             Key: `${fname}`, 
//             Body: Buffer.concat(chunks), // concatinating all chunks
//             ACL: 'public-read',
//             ContentEncoding: fEncoding, // optional
//             ContentType: ftype // required
//         }
//         // we are sending buffer data to s3.
//         S3.upload(params, (err, s3res) => {
//             if (err){
//               res.send({err, status: 'error'});
//             } else {
//               res.send({data:s3res, status: 'success', msg: 'Image successfully uploaded.'});
//             }
//         });

//     });
//     req.pipe(busboy);
// });


// router.route("/").post(async(req, res) => {
//     try {
//         const files = await parseForm(req)
//         const fileUrls = []
//         for (const file of files) {
//             const { fileBuffer, ...fileParams } = file
//             const result = uploadFile(fileBuffer, fileParams)
//             urls.push({ filename: result.key, url: result.Location })
//         }
//         res.status(200).json({ success: true, fileUrls: urls })
//     } catch (err) {
//         console.error(err)
//         res.status(500).json({ success: false, error: err.message })
//     }
// });

// const s3 = new aws.S3();

// Configure Multer to use S3 storage
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'medicinedocs',
//     acl: 'public-read', // Set appropriate ACL based on your requirements
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString() + '-' + file.originalname);
//     },
//   }),
// });


// router.route("/").post(upload.single('myFile'),(req, res) => {
//     console.log(req.file,"file")
//     res.json({ message: 'File uploaded successfully', fileUrl: req.file.location });

// });


const parseForm = async req => {
    return new Promise((resolve, reject) => {
        const form =  Busboy({ headers: req.headers })
        const files = [] // create an empty array to hold the processed files
        const buffers = {} // create an empty object to contain the buffers
        form.on('file', (field, file, filename, enc, mime) => {
            buffers[field] = [] // add a new key to the buffers object
            file.on('data', data => {
                buffers[field].push(data)
            })
            file.on('end', () => {
                files.push({
                    fileBuffer: Buffer.concat(buffers[field]),
                    fileType: mime,
                    fileName: filename,
                    fileEnc: enc,
                })
            })
        })
        form.on('error', err => {
            reject(err)
        })
        form.on('finish', () => {
            resolve(files)
        })
        req.pipe(form) // pipe the request to the form handler
    })
}

function uploadFile (buffer, fileParams)  {
    const params = {
      Bucket: 'medicinedocs',
      Key: fileParams.fileName,
      Body: buffer,
      ContentType: fileParams.fileType,
      ContentEncoding: fileParams.fileEnc,
    }
    return S3.putObject(params).promise()
  }

// export default async (req, res) => {
//     // or module.exports = async (req, res) => {
//     try {
//         const files = await parseForm(req)
//         const fileUrls = []
//         for (const file of files) {
//             const { fileBuffer, ...fileParams } = file
//             const result = uploadFile(fileBuffer, fileParams)
//             urls.push({ filename: result.key, url: result.Location })
//         }
//         res.status(200).json({ success: true, fileUrls: urls })
//     } catch (err) {
//         console.error(err)
//         res.status(500).json({ success: false, error: err.message })
//     }
// }

// router.route("/").post(async(req, res) => {
//     await fileparser(req)
//         .then(data => {
//             res.status(200).json({
//                 message: "Success",
//                 data
//             })
//         })
//         .catch(error => {
//             console.log(error)
//             res.status(400).json({
//                 message: "An error occurred.",
//                 error
//             })
//         })
//     // console.log("inside", req)
//     // let bucketName = aws.medicine.BUCKET_NAME;
//     // if (req.query.type == 'medicinedocs') {
//     //     bucketName = aws.medicine.BUCKET_NAME;
//     // }
//     // if (req.query.type == 'attachment') {
//     //     bucketName = aws.attachment.BUCKET_NAME;
//     // }
//     // if(req.query.type == 'images'){
//     //     bucketName = aws.quotation_images.BUCKET_NAME;

//     // }
//     // return S3.uploadToS3(req, bucketName)
//     //     .then((file_location) => {
//     //         console.log(file_location);
//     //         if (req.query.type == 'medicinedocs' || req.query.type == 'images') {
//     //             res.status(200).json(file_location);
//     //             return;
//     //         }
//     //         res.send(file_location);
//     //         return file_location;
//     //     })
//     //     .catch((err) => { res.status(500).send(err) });
// });


// router.get('/download/:id', (req, res) => {
//     Quotation.findById(req.params.id)
//         .select('s3Location -_id')
//         .then((quotation) => {
//             if (!quotation) return res.status(404).json('No quotation found.');
//             res.status(200).send(quotation.s3Location);
//         })
//         .catch((err) => res.status(500).send(err));
// });


// module.exports = router;


const express = require('express');
const router = express.Router();

// const Quotation = require('../models/quotation');
const S3 = require('./s3.service');
const aws = require('../../config/aws');
const fileparser = require('./fileparser');


// router.post('/upload', function (req, res) {
router.route("/").post( (req, res) => {
    // console.log("inside", req)
    let bucketName = aws.medicine.BUCKET_NAME;
    if (req.query.type == 'medicinedocs') {
        bucketName = aws.medicine.BUCKET_NAME;
    }
    // if (req.query.type == 'attachment') {
    //     bucketName = aws.attachment.BUCKET_NAME;
    // }
    // if(req.query.type == 'images'){
    //     bucketName = aws.quotation_images.BUCKET_NAME;

    // }
    return S3.uploadToS3(req, bucketName)
        .then((file_location) => {
            console.log(file_location);
            if (req.query.type == 'medicinedocs' || req.query.type == 'images') {
                res.status(200).json(file_location);
                return;
            }
            res.send(file_location);
            return file_location;
        })
        .catch((err) => { res.status(500).send(err) });
});


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


router.get('/download/:id', (req, res) => {
    Quotation.findById(req.params.id)
        .select('s3Location -_id')
        .then((quotation) => {
            if (!quotation) return res.status(404).json('No quotation found.');
            res.status(200).send(quotation.s3Location);
        })
        .catch((err) => res.status(500).send(err));
});


module.exports = router;

